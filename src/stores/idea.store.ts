import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import { completion } from "../data/OpenAI";
import {
  EvaluationResponse,
  EVALUATION_INTERPRETATION,
  handleEvaluationResponse,
} from "../utils/response.util";

export type IdeaEval = {
  viable: boolean;
  viabilityWhy: EvaluationResponse;
  improvements?: EvaluationResponse | undefined;
  realization?: EvaluationResponse | undefined;
  problem?: EvaluationResponse | undefined;
  // Is this idea innovative?
  // innovation?: EvaluationResponse | undefined;
};

export default class IdeaStore {
  genIdea?: string;
  idea?: string;
  whatIs?: string;
  whatShouldBe?: string;
  evaluation?: IdeaEval;

  constructor() {
    makeObservable(this, {
      genIdea: observable,
      idea: observable,
      evaluation: observable,
      ideaCompletion: action,
      setProblem: action,
      evaluateIdea: action,
      preEvaluateIdea: action,
      setIdea: action,
      setEvaluation: action,
    });
  }

  setProblem = (whatIs: string, whatShouldBe: string) => {
    this.whatIs = whatIs;
    this.whatShouldBe = whatShouldBe;
    this.ideaCompletion();
  };

  setIdea = (idea: string) => {
    this.idea = idea;
  };

  setEvaluation = (evaluation: IdeaEval | undefined) => {
    this.evaluation = evaluation;
  };

  evaluateIdea = async () => {
    const viable = await this.preEvaluateIdea();

    let viabilityWhy: EvaluationResponse;
    let improvements: EvaluationResponse | undefined;
    let realization: EvaluationResponse | undefined;
    let problem: EvaluationResponse | undefined;

    if (!viable) {
      const prompt = this.promptPrefixAndSuffix(
        "Why is the product idea not viable?"
      );
      const response = await completion(prompt);

      viabilityWhy = {
        response: response!,
        interpretation: EVALUATION_INTERPRETATION.NEGATIVE,
      };
    } else {
      /// Viability Why
      const prompt = this.promptPrefixAndSuffix(
        "Why is the product idea viable?"
      );
      const response = await completion(prompt);

      viabilityWhy = handleEvaluationResponse(response!);
      /// Improvements
      const prompt2 = this.promptPrefixAndSuffix(
        "What improvements can be made to the product idea? Answer with a list of the five most relevant improvements.",
        false
      );

      const response2 = await completion(prompt2);

      improvements = {
        response: response2!,
        interpretation: EVALUATION_INTERPRETATION.POSITIVE,
      };

      /// Realization
      const prompt3 = this.promptPrefixAndSuffix(
        "How can the product idea be realized?"
      );

      const response3 = await completion(prompt3);

      realization = handleEvaluationResponse(response3!);

      /// Problem
      const prompt4 = this.promptPrefixAndSuffix(
        "Are there any problems with this idea? If so, make the case for the biggest one."
      );

      const response4 = await completion(prompt4);

      problem = handleEvaluationResponse(response4!);
    }

    const evaluation = {
      viable: viable,
      viabilityWhy: viabilityWhy,
      improvements: improvements,
      realization: realization,
      problem: problem,
    };

    this.setEvaluation(evaluation);
  };

  async preEvaluateIdea(): Promise<boolean> {
    const prompt = this.promptPrefixAndSuffix(
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

  promptPrefixAndSuffix(prompt: string, includeSuffix = true): string {
    const prefix = "The product idea: ";

    const idea = this.idea! + "\n \n ";

    const suffix = `\n \n Finally, at the end of your response, characterize it with either "Positive.", "Negative.", or "Neutral."`;

    if (!includeSuffix) {
      return prefix + idea + prompt;
    } else {
      return prefix + idea + prompt + suffix;
    }
  }

  async ideaCompletion() {
    const prompt = `A problem is a conflict between what is and what should be. What is: ${this.whatIs}. What should be: ${this.whatShouldBe}. An idea is a plan for how to bridge the grap between what is and what shold be. Bridge the gap!`;
    const result = await completion(prompt);

    this.genIdea = result;
  }
}
