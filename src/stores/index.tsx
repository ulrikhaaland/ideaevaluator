import { makeObservable, observable, action } from "mobx";
import { createContext, useContext } from "react";
import DemandStore from "./demand.store";
import IdeaStore from "./idea.store";
import SummaryStore from "./summary.store";

interface Store {
  ideaStore: IdeaStore;
  demandStore: DemandStore;
  summaryStore: SummaryStore;
}

export const store: Store = {
  ideaStore: new IdeaStore(),
  demandStore: new DemandStore(),
  summaryStore: new SummaryStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
