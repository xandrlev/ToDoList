import React, { ChangeEvent, useCallback } from "react";
import { EditSpan } from "../EditSpan/EditSpan";
import { Checkbox, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { TaskType } from "../ToDoList/ToDoList";

type TaskPropsType = {
  removeTask: (id: string, toDoListId: string) => void;
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
  task: TaskType;
  toDoListId: string;
};

const Task = React.memo((props: TaskPropsType) => {
  const onRemoveHandler = useCallback(() => {
    props.removeTask(props.task.id, props.toDoListId);
  }, [props.removeTask]);

  // check input
  const onChangeStatusHandler = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      props.changeTaskStatus(
        props.task.id,
        currentTarget.checked,
        props.toDoListId
      );
    },
    [props.changeTaskStatus]
  );

  // change title input
  const onChangeTitleHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(props.toDoListId, props.task.id, newValue);
    },
    [props.changeTaskTitle, props.toDoListId, props.task.id]
  );

  return (
    <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
      <Checkbox
        checked={props.task.isDone}
        onChange={onChangeStatusHandler}
        size="small"
      />
      <EditSpan title={props.task.title} onChangeTitle={onChangeTitleHandler} />
      <IconButton onClick={onRemoveHandler}>
        <Delete fontSize="small" />
      </IconButton>
    </li>
  );
});

export default Task;
