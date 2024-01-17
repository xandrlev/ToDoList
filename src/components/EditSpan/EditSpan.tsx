import { TextField } from "@mui/material";
import { useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";

type EditSpanPropsType = {
  title: string;
  onChangeTitle: (value:string) => void
};

export const EditSpan = (props: EditSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  const activeEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };
  const activeViewMode = () => {
    setEditMode(false);
    props.onChangeTitle(title)
  };

  const onChangeTitle = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setTitle(currentTarget.value);
  };

  return editMode ? (
    <TextField
      type="text"
      value={title}
      onChange={onChangeTitle}
      onBlur={activeViewMode}
      autoFocus
      size="small"
      variant="standard"
    />
  ) : (
    <span onDoubleClick={activeEditMode}>{props.title}</span>
  );
};
