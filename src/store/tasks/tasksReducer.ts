import { v1 } from "uuid";
import { TaskStateType } from "../../AppWithReducer";
import {
  AddToDoListActionType,
  RemoveToDoListActionType,
} from "../toDoList/toDoLostReducer";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  toDoListId: string;
  taskId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  toDoListId: string;
  title: string;
};

export type ChangeStatusTaskActionType = {
  type: "CHANGE-STATUS-TASK";
  toDoListId: string;
  taskId: string;
  isDone: boolean;
};

export type ChangeTitleTaskActionType = {
  type: "CHANGE-TITLE-TASK";
  toDoListId: string;
  taskId: string;
  title: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusTaskActionType
  | ChangeTitleTaskActionType
  | AddToDoListActionType
  | RemoveToDoListActionType;

export const tasksReducer = (
  state: TaskStateType,
  action: ActionsType
): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const copyState = { ...state };
      const toDoList = copyState[action.toDoListId];
      const filteredTask = toDoList.filter((t) => t.id !== action.taskId);
      copyState[action.toDoListId] = filteredTask;
      return copyState;
    }
    case "ADD-TASK": {
      const copyState = { ...state };
      const toDoList = copyState[action.toDoListId];
      const newTask = { id: v1(), title: action.title, isDone: false };
      const newTodDoList = [newTask, ...toDoList];
      copyState[action.toDoListId] = newTodDoList;
      return copyState;
    }
    case "CHANGE-STATUS-TASK": {
      const copyState = { ...state };
      const toDoList = copyState[action.toDoListId];
      const task = toDoList.find((t) => t.id === action.taskId);
      if (task) task.isDone = action.isDone;
      return copyState;
    }
    case "CHANGE-TITLE-TASK": {
      const copyState = { ...state };
      const toDoList = copyState[action.toDoListId];
      const task = toDoList.find((t) => t.id === action.taskId);
      if (task) task.title = action.title;
      return copyState;
    }
    case "ADD-TODOLIST": {
      const copyState = { ...state };
      copyState[action.id] = [];
      return copyState;
    }
    case "REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  toDoListId: string,
  taskId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", toDoListId, taskId };
};

export const addTaskAC = (
  toDoListId: string,
  title: string
): AddTaskActionType => {
  return { type: "ADD-TASK", toDoListId, title };
};

export const changeStatusAC = (
  toDoListId: string,
  isDone: boolean,
  taskId: string
): ChangeStatusTaskActionType => {
  return { type: "CHANGE-STATUS-TASK", toDoListId, taskId, isDone };
};

export const changeTaskTitleAC = (
  toDoListId: string,
  taskId: string,
  title: string
): ChangeTitleTaskActionType => {
  return { type: "CHANGE-TITLE-TASK", toDoListId, taskId, title };
};
