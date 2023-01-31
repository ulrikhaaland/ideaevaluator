import { createContext, useContext } from "react";
import DemandStore from "./demand.store";
import IdeaStore from "./idea.store";

interface Store {
  ideaStore: IdeaStore;
  demandStore: DemandStore;
}

export const store: Store = {
  ideaStore: new IdeaStore(),
  demandStore: new DemandStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
