import { FilterValuesType, ToDoListType } from "../../App";
import {
  changeToDoListTitleAC,
  filterToDoListAC,
  removeToDoListAC,
  addToDoListAC,
  toDoListReducer,
} from "./toDoLostReducer";
import { v1 } from "uuid";

test("correct toDoList should be removed", () => {
  let toDoListId1 = v1();
  let toDoListId2 = v1();

  const startState: Array<ToDoListType> = [
    { id: toDoListId1, title: "What to learn", filter: "all" },
    { id: toDoListId2, title: "What to buy", filter: "all" },
  ];

  const endState = toDoListReducer(startState, removeToDoListAC(toDoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(toDoListId2);
});

test("correct toDoList should be added", () => {
  let toDoListId1 = v1();
  let toDoListId2 = v1();

  let newToDoListTitle = "New toDo";

  const startState: Array<ToDoListType> = [
    { id: toDoListId1, title: "What to learn", filter: "all" },
    { id: toDoListId2, title: "What to buy", filter: "all" },
  ];

  const endState = toDoListReducer(startState, addToDoListAC(newToDoListTitle));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newToDoListTitle);
  expect(endState[0].filter).toBe("all");
});

test("correct toDoList should change name", () => {
  let toDoListId1 = v1();
  let toDoListId2 = v1();

  let newToDoListTitle = "New toDo";

  const startState: Array<ToDoListType> = [
    { id: toDoListId1, title: "What to learn", filter: "all" },
    { id: toDoListId2, title: "What to buy", filter: "all" },
  ];

  const endState = toDoListReducer(
    startState,
    changeToDoListTitleAC(toDoListId2, newToDoListTitle)
  );

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newToDoListTitle);
});

test("correct filter of toDoList should changed", () => {
  let toDoListId1 = v1();
  let toDoListId2 = v1();

  let newFilter: FilterValuesType = "completed";

  const startState: Array<ToDoListType> = [
    { id: toDoListId1, title: "What to learn", filter: "all" },
    { id: toDoListId2, title: "What to buy", filter: "all" },
  ];

  const endState = toDoListReducer(
    startState,
    filterToDoListAC(newFilter, toDoListId2)
  );

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
