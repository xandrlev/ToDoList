import { combineReducers, createStore } from "redux";
import { toDoListReducer } from "./toDoList/toDoLostReducer";
import { tasksReducer } from "./tasks/tasksReducer";

export type rootReducerType = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  todoLists: toDoListReducer,
  tasks: tasksReducer,
});

export const store = createStore(rootReducer);

//@ts-ignore
window.store = store;
