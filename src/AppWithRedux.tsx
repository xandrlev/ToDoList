import { TaskType, ToDoList } from "./components/ToDoList/ToDoList";
import { AddItemForm } from "./components/AddItemForm/AddItemForm";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Paper from "@mui/material/Paper";
import {
  addToDoListAC,
  changeToDoListTitleAC,
  filterToDoListAC,
  removeToDoListAC,
} from "./store/toDoList/toDoLostReducer";
import {
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from "./store/tasks/tasksReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { rootReducerType } from "./store/store";
import { useCallback } from "react";

export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function AppWithReducer() {
  const dispatch = useDispatch();
  const todoLists = useSelector<rootReducerType, Array<ToDoListType>>(
    (state) => state.todoLists
  );
  const tasks = useSelector<rootReducerType, TaskStateType>(
    (state) => state.tasks
  );

  const removeTask = useCallback(
    (toDoListId: string, taskId: string) => {
      dispatch(removeTaskAC(taskId, toDoListId));
    },
    [dispatch]
  );

  const addItem = useCallback(
    (title: string, toDoListId: string) => {
      dispatch(addTaskAC(toDoListId, title));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (filter: FilterValuesType, id: string) => {
      dispatch(filterToDoListAC(filter, id));
    },
    [dispatch]
  );

  const changeTaskStatus = useCallback(
    (taskId: string, isDone: boolean, toDoListId: string) => {
      dispatch(changeStatusAC(toDoListId, isDone, taskId));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    (toDoListId: string, taskId: string, newTitle: string) => {
      dispatch(changeTaskTitleAC(toDoListId, taskId, newTitle));
    },
    [dispatch]
  );

  const changeToDoListTitle = useCallback(
    (toDoListID: string, newTitle: string) => {
      dispatch(changeToDoListTitleAC(toDoListID, newTitle));
    },
    [dispatch]
  );

  const removeToDoList = useCallback(
    (toDoListId: string) => {
      dispatch(removeToDoListAC(toDoListId));
    },
    [dispatch]
  );

  const addToDoList = useCallback(
    (title: string) => {
      dispatch(addToDoListAC(title));
    },
    [dispatch]
  );

  return (
    <div className="App">
      <AppBar position="static" sx={{ mb: 5 }}>
        <Toolbar>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            To Do List
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container sx={{ mb: 5 }}>
          <AddItemForm addItem={addToDoList} />
        </Grid>

        <Grid container spacing={5}>
          {todoLists.map((item) => {
            let statusToDoList = tasks[item.id];

            return (
              <Grid item key={item.id}>
                <Paper elevation={4} sx={{ padding: 2 }}>
                  <ToDoList
                    id={item.id}
                    title={item.title}
                    tasks={statusToDoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addItem}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={item.filter}
                    removeToDoList={removeToDoList}
                    changeToDoListTitle={changeToDoListTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWithReducer;
