import { createStore } from "redux";
import { INITIAL_STATE } from "./StoreInitialState";

// Reducer function with typed state and action
const createReducer = (
  store = INITIAL_STATE,
  action) => {
  switch (action.type) {
    case "create": {
        console.log({ ...store, tasks: [...store.tasks,action.payload] })
      return { ...store, tasks: [...store.tasks,action.payload] }; // Only keep one role
    }
    default:
      return store;
  }
};

// Create the Redux store
const store = createStore(createReducer);

export default store;
