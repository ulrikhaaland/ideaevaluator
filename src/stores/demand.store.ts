import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import { completion } from "../data/OpenAI";

export type DemandEval = {
  demanded: boolean;
  demandWhy: string;
  marketSize?: string;
  trend?: string;
  problem?: string;
};

export default class DemandStore {
  idea?: string;
  evaluation?: DemandEval;

  constructor() {
    makeObservable(this, {
      idea: observable,
      evaluation: observable,
      evaluateDemand: action,
      preEvaluateDemand: action,
      setIdea: action,
      setEvaluation: action,
    });
  }

  setIdea = (idea: string) => {
    this.idea = idea;
  };

  setEvaluation = (evaluation: DemandEval | undefined) => {
    this.evaluation = evaluation;
  };

  evaluateDemand = async () => {
    const demanded = await this.preEvaluateDemand();

    let demandWhy: string | undefined;
    let marketSize: string | undefined;
    let trend: string | undefined;
    let problem: string | undefined;

    if (!demanded) {
      const prompt = this.addIdeaToPrompt(
        "Why is there no demand for this product idea?"
      );
      demandWhy = await completion(prompt);
    } else {
      /// Viability Why
      const prompt = this.addIdeaToPrompt(
        "Why is there demand for this product idea?"
      );
      demandWhy = await completion(prompt);

      /// marketSize
      const prompt2 = this.addIdeaToPrompt(
        "What is the market size for this product idea in 2023? Be specific and include numbers."
      );
      marketSize = await completion(prompt2);

      /// trend
      const prompt3 = this.addIdeaToPrompt(
        "Is there a growing market trend for this product idea? Use google trends API as a reference."
      );
      trend = await completion(prompt3);

      /// Problem
      const prompt4 = this.addIdeaToPrompt(
        "Are there any problems with the demand for this product idea? If so, make the case for the biggest one."
      );
      problem = await completion(prompt4);
    }

    const evaluation = {
      demanded: demanded,
      demandWhy: demandWhy ?? "",
      marketSize: marketSize,
      trend: trend,
      problem: problem,
    };

    this.evaluation = evaluation;
  };

  async preEvaluateDemand(): Promise<boolean> {
    const prompt = this.addIdeaToPrompt(
      "Is there a demand for this product idea? Answer with a yes or no."
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

  addIdeaToPrompt(prompt: string): string {
    return "The product idea: " + this.idea! + "\n \n " + prompt;
  }
}
