import { createStore } from "redux";
import { INITIAL_STATE } from "./StoreInitialState";

// Reducer function with typed state and action
const createReducer = (
  store = INITIAL_STATE,
  action) => {
  switch (action.type) {
    case "create": {
      return { ...store, tasks: [...store.tasks,action.payload] }; // Only keep one role
    }
    case "save": {
      return {
        ...store,
        tasks: store.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    }
    case "delete": {
      return {
        ...store,
        tasks: store.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    }
    default:
      return store;
  }
};

// Create the Redux store
const store = createStore(createReducer);

export default store;
