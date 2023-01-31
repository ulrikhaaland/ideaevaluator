import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import { completion } from "../data/OpenAI";

export type IdeaEval = {
  viable: boolean;
  viabilityWhy: string;
  improvements?: string;
  realization?: string;
  problem?: string;
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

    let viabilityWhy: string | undefined;
    let improvements: string | undefined;
    let realization: string | undefined;
    let problem: string | undefined;

    if (!viable) {
      const prompt = this.addIdeaToPrompt(
        "Why is the product idea not viable?"
      );
      viabilityWhy = await completion(prompt);
    } else {
      /// Viability Why
      const prompt = this.addIdeaToPrompt("Why is the product idea viable?");
      viabilityWhy = await completion(prompt);

      /// Improvements
      const prompt2 = this.addIdeaToPrompt(
        "What improvements can be made to the product idea? Answer with a list of the five most relevant improvements."
      );
      improvements = await completion(prompt2);

      /// Realization
      const prompt3 = this.addIdeaToPrompt(
        "How can the product idea be realized?"
      );
      realization = await completion(prompt3);

      /// Problem
      const prompt4 = this.addIdeaToPrompt(
        "Are there any problems with this idea? If so, make the case for the biggest one."
      );
      problem = await completion(prompt4);
    }

    const evaluation = {
      viable: viable,
      viabilityWhy: viabilityWhy ?? "",
      improvements: improvements,
      realization: realization,
      problem: problem,
    };

    this.evaluation = evaluation;
  };

  async preEvaluateIdea(): Promise<boolean> {
    const prompt = this.addIdeaToPrompt(
      "Is this a viable product idea? Answer with a yes or no."
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

  async ideaCompletion() {
    const prompt = `A problem is a conflict between what is and what should be. What is: ${this.whatIs}. What should be: ${this.whatShouldBe}. An idea is a plan for how to bridge the grap between what is and what shold be. Bridge the gap!`;
    const result = await completion(prompt);

    this.genIdea = result;
  }
}
