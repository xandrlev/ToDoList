import { TaskStateType, ToDoListType } from "../AppWithReducer";
import { tasksReducer } from "./tasks/tasksReducer";
import { addToDoListAC, toDoListReducer } from "./toDoList/toDoLostReducer";

test("ids should be equals", () => {
  const startTaskState: TaskStateType = {};
  const startToDoListState: Array<ToDoListType> = [];

  const action = addToDoListAC("new toDoList");

  const endTaskState = tasksReducer(startTaskState, action);
  const endToDoListState = toDoListReducer(startToDoListState, action);

  const keys = Object.keys(endTaskState);
  const idFromTasks = keys[0];
  const idFromToDoLists = endToDoListState[0].id;

  expect(idFromTasks).toBe(action.id);
  expect(idFromToDoLists).toBe(action.id);
});
