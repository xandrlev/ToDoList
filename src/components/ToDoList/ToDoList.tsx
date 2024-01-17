import { FilterValuesType } from "../../App";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { ChangeEvent } from "react";
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

export const ToDoList = (props: PropsType) => {
  const changeFilterAll = () => props.changeFilter("all", props.id);
  const changeFilterActive = () => props.changeFilter("active", props.id);
  const changeFilterCompleted = () => props.changeFilter("completed", props.id);

  const removeToDoList = () => {
    props.removeToDoList(props.id);
  };

  const changeToDoListTitle = (newTitle: string) => {
    props.changeToDoListTitle(props.id, newTitle);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

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
        {props.tasks.map((item) => {
          const onRemoveHandler = () => {
            props.removeTask(item.id, props.id);
          };

          // check input
          const onChangeStatusHandler = ({
            currentTarget,
          }: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(item.id, currentTarget.checked, props.id);
          };

          // change title input
          const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(props.id, item.id, newValue);
          };

          return (
            <li key={item.id} className={item.isDone ? "is-done" : ""}>
              <Checkbox
                checked={item.isDone}
                onChange={onChangeStatusHandler}
                size="small"
              />
              <EditSpan
                title={item.title}
                onChangeTitle={onChangeTitleHandler}
              />
              <IconButton onClick={onRemoveHandler}>
                <Delete fontSize="small" />
              </IconButton>
            </li>
          );
        })}
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
};
