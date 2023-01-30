import { createContext, useContext } from "react";
import IdeaStore from "./idea.store";

interface Store {
  ideaStore: IdeaStore;
}

export const store: Store = {
  ideaStore: new IdeaStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
