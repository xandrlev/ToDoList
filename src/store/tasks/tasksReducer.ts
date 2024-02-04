import { v1 } from "uuid";
import { TaskStateType } from "../../AppWithRedux";
import {
  AddToDoListActionType,
  RemoveToDoListActionType,
  toDoListId1,
  toDoListId2,
} from "../toDoList/toDoLostReducer";
import { TaskType } from "../../components/ToDoList/ToDoList";

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

let task1: Array<TaskType> = [
  { id: v1(), title: "React", isDone: false },
  { id: v1(), title: "Type Script", isDone: false },
  { id: v1(), title: "Java Script", isDone: true },
  { id: v1(), title: "Redux", isDone: false },
  { id: v1(), title: "Material UI", isDone: false },
];

let task2: Array<TaskType> = [
  { id: v1(), title: "Terminator", isDone: false },
  { id: v1(), title: "Back to future", isDone: true },
  { id: v1(), title: "Forest Hump", isDone: false },
];

const initialState: TaskStateType = {
  [toDoListId1]: task1,
  [toDoListId2]: task2,
};

export const tasksReducer = (
  state: TaskStateType = initialState,
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
      const tasks = copyState[action.toDoListId];
      copyState[action.toDoListId] = tasks.map((item) =>
        item.id === action.taskId ? { ...item, isDone: action.isDone } : item
      );
      return copyState;
    }
    case "CHANGE-TITLE-TASK": {
      const copyState = { ...state };
      const tasks = copyState[action.toDoListId];
      copyState[action.toDoListId] = tasks.map((item) =>
        item.id === action.taskId ? { ...item, title: action.title } : item
      );
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
