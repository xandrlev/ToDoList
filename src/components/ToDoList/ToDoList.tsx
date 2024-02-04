import React from "react";
import { FilterValuesType } from "../../App";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import Task from "../Task/Task";
import { ChangeEvent, useCallback } from "react";
import { EditSpan } from "../EditSpan/EditSpan";
import { Button, ButtonGroup, Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  removeTask: (id: string, toDoListId: string) => void;
  changeFilter: (filter: FilterValuesType, id: string) => void;
  addTask: (title: string, toDoListId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    toDoListId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    toDoListId: string
  ) => void;
  filter: FilterValuesType;
  removeToDoList: (toDoListId: string) => void;
  changeToDoListTitle: (toDoListID: string, newTitle: string) => void;
};

export const ToDoList = React.memo((props: PropsType) => {
  console.log("ToDoList");

  const changeFilterAll = useCallback(
    () => props.changeFilter("all", props.id),
    [props.changeFilter, props.id]
  );
  const changeFilterActive = useCallback(
    () => props.changeFilter("active", props.id),
    [props.changeFilter, props.id]
  );
  const changeFilterCompleted = useCallback(
    () => props.changeFilter("completed", props.id),
    [props.changeFilter, props.id]
  );

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.id);
    },
    [props.addTask, props.id]
  );

  const removeToDoList = () => {
    props.removeToDoList(props.id);
  };

  const changeToDoListTitle = useCallback(
    (newTitle: string) => {
      props.changeToDoListTitle(props.id, newTitle);
    },
    [props.changeToDoListTitle, props.id]
  );

  let statusToDoList = props.tasks;

  props.filter === "active"
    ? (statusToDoList = props.tasks.filter((item) => !item.isDone))
    : props.filter === "completed"
    ? (statusToDoList = props.tasks.filter((item) => item.isDone))
    : (statusToDoList = props.tasks);

  return (
    <div>
      <h3>
        <EditSpan title={props.title} onChangeTitle={changeToDoListTitle} />
        <IconButton onClick={removeToDoList}>
          <Delete fontSize="small" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {props.tasks.map((item) => (
          <Task
            key={item.id}
            task={item}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            toDoListId={props.id}
          />
        ))}
      </ul>
      <ButtonGroup variant="outlined" size="small">
        <Button
          variant={props.filter === "all" ? "contained" : "outlined"}
          onClick={changeFilterAll}
          color={"primary"}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "outlined"}
          onClick={changeFilterActive}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "outlined"}
          onClick={changeFilterCompleted}
          color={"secondary"}
        >
          Completed
        </Button>
      </ButtonGroup>
    </div>
  );
});
