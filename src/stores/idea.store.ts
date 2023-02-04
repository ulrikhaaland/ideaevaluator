import { makeObservable, observable, action } from "mobx";
import { completion } from "../data/OpenAI";
import {
  EvaluationResponse,
  EVALUATION_INTERPRETATION,
  handleEvaluationResponse,
} from "../utils/response.util";
import { EvaluationStore } from "./demand.store";

export type IdeaEval = {
  viable: boolean;
  viabilityWhy: EvaluationResponse;
  improvements?: EvaluationResponse | undefined;
  realization?: EvaluationResponse | undefined;
  problem?: EvaluationResponse | undefined;
  // Is this idea innovative?
  // innovation?: EvaluationResponse | undefined;
};

export default class IdeaStore extends EvaluationStore {
  genIdea?: string;
  whatIs?: string;
  whatShouldBe?: string;
  evaluation?: IdeaEval;

  constructor() {
    super();
    makeObservable(this, {
      genIdea: observable,
      evaluation: observable,
      setEvaluation: action,
      ideaCompletion: action,
      setProblem: action,
      preEvaluateIdea: action,
    });
  }

  setProblem = (whatIs: string, whatShouldBe: string) => {
    this.whatIs = whatIs;
    this.whatShouldBe = whatShouldBe;
    this.ideaCompletion();
  };

  setEvaluation(evaluation: IdeaEval | undefined) {
    this.evaluation = evaluation;
  }

  evaluate = async () => {
    const viable = await this.preEvaluateIdea();

    const trainingData: {}[] = [];

    let viabilityWhy: EvaluationResponse;
    let improvements: EvaluationResponse | undefined;
    let realization: EvaluationResponse | undefined;
    let problem: EvaluationResponse | undefined;

    if (!viable) {
      const prompt = super.promptPreAndSuffix(
        "Why is the product idea not viable?"
      );
      const response = await completion(prompt);

      viabilityWhy = {
        response: response!,
        interpretation: EVALUATION_INTERPRETATION.NEGATIVE,
      };

      trainingData.push({
        prompt: prompt,
        completion: response,
      });
    } else {
      /// Viability Why
      const prompt = super.promptPreAndSuffix(
        "Why is the product idea viable?"
      );
      const response = await completion(prompt);

      viabilityWhy = handleEvaluationResponse(response!);

      trainingData.push({
        prompt: prompt,
        completion: response,
      });

      /// Improvements
      const prompt2 = super.promptPreAndSuffix(
        "What improvements can be made to the product idea? Answer with a list of the five most relevant improvements.",
        false
      );

      const response2 = await completion(prompt2);

      improvements = {
        response: response2!,
        interpretation: EVALUATION_INTERPRETATION.POSITIVE,
      };

      trainingData.push({
        prompt: prompt2,
        completion: response2,
      });

      /// Realization
      const prompt3 = super.promptPreAndSuffix(
        "How can the product idea be realized?"
      );

      const response3 = await completion(prompt3);

      realization = handleEvaluationResponse(response3!);

      trainingData.push({
        prompt: prompt3,
        completion: response3,
      });
      /// Problem
      const prompt4 = super.promptPreAndSuffix(
        "Are there any problems with this idea? If so, make the case for the biggest one."
      );

      const response4 = await completion(prompt4);

      problem = handleEvaluationResponse(response4!);

      trainingData.push({
        prompt: prompt4,
        completion: response4,
      });
    }

    const evaluation = {
      viable: viable,
      viabilityWhy: viabilityWhy,
      improvements: improvements,
      realization: realization,
      problem: problem,
    };

    this.setEvaluation(evaluation);

    super.saveDataForTraining(trainingData, "idea");
  };

  async preEvaluateIdea(): Promise<boolean> {
    const prompt = super.promptPreAndSuffix(
      "Is this a viable product idea? Answer with a yes or no.",
      false
    );

    const result = await completion(prompt);

    if (result?.includes("Yes")) {
      return true;
    } else if (result?.includes("No")) {
      return false;
    } else {
      throw new Error("Invalid PreEvaluationOFIDEA");
    }
  }

  async ideaCompletion() {
    const prompt = `A problem is a conflict between what is and what should be. What is: ${this.whatIs}. What should be: ${this.whatShouldBe}. An idea is a plan for how to bridge the grap between what is and what shold be. Bridge the gap!`;
    const result = await completion(prompt);

    this.genIdea = result;
  }
}
