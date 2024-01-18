import { TaskStateType } from "../../AppWithRedux";
import { removeToDoListAC, addToDoListAC } from "../toDoList/toDoLostReducer";
import {
  removeTaskAC,
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  tasksReducer,
} from "./tasksReducer";

test("correct task should be removed", () => {
  const startState: TaskStateType = {
    toDoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "react", isDone: false },
    ],
    toDoListId2: [
      { id: "1", title: "Terminator", isDone: false },
      { id: "2", title: "Back to future", isDone: true },
      { id: "3", title: "Friends", isDone: true },
    ],
  };

  const endState = tasksReducer(startState, removeTaskAC("toDoListId2", "2"));

  expect(endState["toDoListId1"].length).toBe(3);
  expect(endState["toDoListId2"].length).toBe(2);
  expect(endState["toDoListId2"].every((t) => t.id != "2")).toBeTruthy();
});

test("correct task should be added", () => {
  const startState: TaskStateType = {
    toDoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "react", isDone: false },
    ],
    toDoListId2: [
      { id: "1", title: "Terminator", isDone: false },
      { id: "2", title: "Back to future", isDone: true },
      { id: "3", title: "Friends", isDone: true },
    ],
  };

  const endState = tasksReducer(startState, addTaskAC("toDoListId2", "Killer"));

  expect(endState["toDoListId1"].length).toBe(3);
  expect(endState["toDoListId2"].length).toBe(4);
  expect(endState["toDoListId2"][0].id).toBeDefined();
  expect(endState["toDoListId2"][0].title).toBe("Killer");
  expect(endState["toDoListId2"][0].isDone).toBe(false);
});

test("correct task should be changed status", () => {
  const startState: TaskStateType = {
    toDoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "react", isDone: false },
    ],
    toDoListId2: [
      { id: "1", title: "Terminator", isDone: false },
      { id: "2", title: "Back to future", isDone: true },
      { id: "3", title: "Friends", isDone: true },
    ],
  };

  const endState = tasksReducer(
    startState,
    changeStatusAC("toDoListId2", false, "2")
  );

  expect(endState["toDoListId1"][1].isDone).toBeTruthy();
  expect(endState["toDoListId2"][1].isDone).toBeFalsy();
});

test("correct task should be changed title", () => {
  const startState: TaskStateType = {
    toDoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "react", isDone: false },
    ],
    toDoListId2: [
      { id: "1", title: "Terminator", isDone: false },
      { id: "2", title: "Back to future", isDone: true },
      { id: "3", title: "Friends", isDone: true },
    ],
  };

  const endState = tasksReducer(
    startState,
    changeTaskTitleAC("toDoListId2", "2", "Killer")
  );

  expect(endState["toDoListId1"][1].title).toBe("JS");
  expect(endState["toDoListId2"][1].title).toBe("Killer");
});

test("correct add task in toDoList", () => {
  const startState: TaskStateType = {
    toDoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "react", isDone: false },
    ],
    toDoListId2: [
      { id: "1", title: "Terminator", isDone: false },
      { id: "2", title: "Back to future", isDone: true },
      { id: "3", title: "Friends", isDone: true },
    ],
  };

  const endState = tasksReducer(
    startState,
    addToDoListAC(`toDoList${Object.keys(startState).length + 1}`)
  );

  const keys = Object.keys(endState);
  const newKey = keys.find((t) => t != "toDoListId1" && t != "toDoListId2");
  if (!newKey) throw new Error("new key should be added");

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toEqual([]);
});

test("correct remove tasks with toDoList", () => {
  const startState: TaskStateType = {
    toDoListId1: [
      { id: "1", title: "CSS", isDone: false },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "react", isDone: false },
    ],
    toDoListId2: [
      { id: "1", title: "Terminator", isDone: false },
      { id: "2", title: "Back to future", isDone: true },
      { id: "3", title: "Friends", isDone: true },
    ],
  };

  const action = removeToDoListAC("toDoListId2");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["toDoListId2"]).toBeUndefined();
});
