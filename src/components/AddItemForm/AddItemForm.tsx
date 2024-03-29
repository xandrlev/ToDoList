import React from "react";
import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { AddBox } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";

type PropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm = React.memo((props: PropsType) => {
  
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handlerAddTask = (title: string) => {
    if (title.trim() !== "") {
      let editTitle =
        title.trim().slice(0, 1).toUpperCase() +
        title.slice(1).toLocaleLowerCase();
      props.addItem(editTitle);
      setNewTaskTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeInputTask = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(currentTarget.value);
  };

  const onKeyDownInputTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) setError(null);
    if (e.key === "Enter") {
      handlerAddTask(newTaskTitle);
    }
  };

  const onClickInputTask = (e: MouseEvent<HTMLButtonElement>) => {
    handlerAddTask(newTaskTitle);
  };

  return (
    <div>
      <TextField
        type="text"
        label="Enter task"
        // className={error ? "error" : ""}
        value={newTaskTitle}
        onChange={onChangeInputTask}
        onKeyDown={onKeyDownInputTask}
        variant={"outlined"}
        error={!!error}
        helperText={error}
        size="small"
        // fullWidth
      />
      <IconButton onClick={onClickInputTask}>
        <AddBox color="primary" />
      </IconButton>
      {/* реализация ошибки стандартным способом без material UI */}
      {/* {error && <div className="error-message">{error}</div>} */}
    </div>
  );
});
