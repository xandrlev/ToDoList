import { v1 } from "uuid";
import { FilterValuesType, ToDoListType } from "../../AppWithReducer";

export type RemoveToDoListActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type AddToDoListActionType = {
  type: "ADD-TODOLIST";
  id: string;
  title: string;
};

export type ChangeToDoListTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeToDoListFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | RemoveToDoListActionType
  | AddToDoListActionType
  | ChangeToDoListTitleActionType
  | ChangeToDoListFilterActionType;

export const toDoListReducer = (
  state: ToDoListType[],
  action: ActionsType
): ToDoListType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST":
      return state.filter((item) => item.id !== action.id);

    case "ADD-TODOLIST":
      return [{ id: action.id, title: action.title, filter: "all" }, ...state];

    case "CHANGE-TODOLIST-TITLE":
      {
        const toDo = state.find((item) => item.id === action.id);
        if (toDo) toDo.title = action.title;
      }
      return [...state];

    case "CHANGE-TODOLIST-FILTER":
      {
        const toDo = state.find((item) => item.id === action.id);
        if (toDo) toDo.filter = action.filter;
      }
      return [...state];

    default:
      return state;
  }
};

export const removeToDoListAC = (
  toDoListId: string
): RemoveToDoListActionType => {
  return { type: "REMOVE-TODOLIST", id: toDoListId };
};

export const addToDoListAC = (title: string): AddToDoListActionType => {
  return { type: "ADD-TODOLIST", title, id: v1() };
};

export const changeToDoListTitleAC = (
  id: string,
  title: string
): ChangeToDoListTitleActionType => {
  return {
    type: "CHANGE-TODOLIST-TITLE",
    id,
    title,
  };
};

export const filterToDoListAC = (
  filter: FilterValuesType,
  id: string
): ChangeToDoListFilterActionType => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    id,
    filter,
  };
};
