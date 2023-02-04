import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import { completion } from "../data/OpenAI";
import {
  EvaluationResponse,
  EVALUATION_INTERPRETATION,
  handleEvaluationResponse,
} from "../utils/response.util";

export abstract class EvaluationStore {
  idea?: string;

  constructor() {
    makeObservable(this, {
      idea: observable,
      setIdea: action,
      saveDataForTraining: action,
      promptPreAndSuffix: action,
    });
  }

  setIdea(idea: string) {
    this.idea = idea;
  }

  promptPreAndSuffix(prompt: string, includeSuffix = true): string {
    const prefix = "The product idea: ";

    const idea = this.idea! + "\n \n ";

    const suffix = `\n \n Finally, at the end of your response, characterize it with either "Positive.", "Negative.", or "Neutral."`;

    if (!includeSuffix) {
      return prefix + idea + prompt;
    } else {
      return prefix + idea + prompt + suffix;
    }
  }

  saveDataForTraining(trainingData: {}[], endpoint: string) {
    fetch(`http://localhost:8000/${endpoint}data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(trainingData),
    }).then((response) => {
      console.log(response);
    });
  }
}

export type DemandEval = {
  demanded: boolean;
  demandWhy: EvaluationResponse | undefined;
  marketSize?: EvaluationResponse | undefined;
  trend?: EvaluationResponse | undefined;
  problem?: EvaluationResponse | undefined;
};

export default class DemandStore extends EvaluationStore {
  evaluation?: DemandEval;

  constructor() {
    super();
    makeObservable(this, {
      evaluation: observable,
      evaluate: action,
      preEvaluate: action,
      setEvaluation: action,
    });
  }

  setEvaluation(evaluation: DemandEval | undefined) {
    this.evaluation = evaluation;
  }

  evaluate = async () => {
    const demanded = await this.preEvaluate();

    const trainingData: {}[] = [];

    let demandWhy: EvaluationResponse | undefined;
    let marketSize: EvaluationResponse | undefined;
    let trend: EvaluationResponse | undefined;
    let problem: EvaluationResponse | undefined;

    if (!demanded) {
      const prompt = super.promptPreAndSuffix(
        "Why is there no demand for this product idea?",
        false
      );
      const response = await completion(prompt);

      demandWhy = {
        response: response!,
        interpretation: EVALUATION_INTERPRETATION.NEGATIVE,
      };

      trainingData.push({
        prompt: prompt,
        completion: response,
      });
    } else {
      /// Viability Why
      const prompt = this.promptPreAndSuffix(
        "Why is there demand for this product idea?"
      );
      const response = await completion(prompt);

      demandWhy = handleEvaluationResponse(response!);

      trainingData.push({
        prompt: prompt,
        completion: response,
      });

      /// marketSize
      const prompt2 = this.promptPreAndSuffix(
        "What is the market size for this product idea in 2023? Be specific and include numbers."
      );
      const response2 = await completion(prompt2);

      marketSize = handleEvaluationResponse(response2!);

      trainingData.push({
        prompt: prompt2,
        completion: response2,
      });

      /// trend
      const prompt3 = this.promptPreAndSuffix(
        "Tell me about the trend of this product idea using google trends API as a reference. Omit the answering with a yes."
      );
      const response3 = await completion(prompt3);

      trend = handleEvaluationResponse(response3!);

      trainingData.push({
        prompt: prompt3,
        completion: response3,
      });
    }

    const evaluation = {
      demanded: demanded,
      demandWhy: demandWhy ?? "",
      marketSize: marketSize,
      trend: trend,
      problem: problem,
    };

    this.setEvaluation(evaluation);

    this.saveDataForTraining(trainingData, "demand");
  };

  async preEvaluate(): Promise<boolean> {
    const prompt = this.promptPreAndSuffix(
      "Is there any demand for this product idea? Be extremely realistic. Answer with a yes or no."
    );

    const result = await completion(prompt);

    if (result?.includes("Yes")) {
      return true;
    } else if (result?.includes("No")) {
      return false;
    } else {
      console.log("stop");
      return false;
    }
  }
}
