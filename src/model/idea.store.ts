import { makeObservable, observable, action } from "mobx";
import { createContext } from "react";
import { completion } from "../data/OpenAI";

class IdeaStore {
  genIdea?: string;
  idea?: string;
  whatIs?: string;
  whatShouldBe?: string;

  constructor() {
    makeObservable(this, {
      genIdea: observable,
      idea: observable,
      ideaCompletion: action,
      setProblem: action,
    });
  }

  setProblem = (whatIs: string, whatShouldBe: string) => {
    this.whatIs = whatIs;
    this.whatShouldBe = whatShouldBe;
    this.ideaCompletion();
  };

  async ideaCompletion() {
    const prompt = `A problem is a conflict between what is and what should be. What is: ${this.whatIs}. What should be: ${this.whatShouldBe}. An idea is a plan for how to bridge the grap between what is and what shold be. Bridge the gap!`;
    const result = await completion(prompt);

    this.genIdea = result;
  }
}

export const IdeaStoreContext = createContext(new IdeaStore());
