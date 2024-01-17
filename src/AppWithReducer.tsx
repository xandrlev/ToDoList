import { useReducer } from "react";
import { v1 } from "uuid";
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
  toDoListReducer,
} from "./store/toDoList/toDoLostReducer";
import {
  addTaskAC,
  changeStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
} from "./store/tasks/tasksReducer";

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

  let toDoListId1 = v1();
  let toDoListId2 = v1();

  let todoListsArray: Array<ToDoListType> = [
    { id: toDoListId1, title: "Learn", filter: "all" },
    { id: toDoListId2, title: "Watch", filter: "all" },
  ];

  const [todoLists, dispatchToDoListsReducer] = useReducer(
    toDoListReducer,
    todoListsArray
  );

  const [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
    [toDoListId1]: task1,
    [toDoListId2]: task2,
  });

  const removeTask = (toDoListId: string, taskId: string) => {
    dispatchTasksReducer(removeTaskAC(taskId, toDoListId));
  };

  const addItem = (title: string, toDoListId: string) => {
    dispatchTasksReducer(addTaskAC(toDoListId, title));
  };

  const changeFilter = (filter: FilterValuesType, id: string) => {
    dispatchToDoListsReducer(filterToDoListAC(filter, id));
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    toDoListId: string
  ) => {
    dispatchTasksReducer(changeStatusAC(toDoListId, isDone, taskId));
  };

  const changeTaskTitle = (
    toDoListId: string,
    taskId: string,
    newTitle: string
  ) => {
    dispatchTasksReducer(changeTaskTitleAC(toDoListId, taskId, newTitle));
  };

  const changeToDoListTitle = (toDoListID: string, newTitle: string) => {
    dispatchToDoListsReducer(changeToDoListTitleAC(toDoListID, newTitle));
  };

  const removeToDoList = (toDoListId: string) => {
    dispatchToDoListsReducer(removeToDoListAC(toDoListId));
    dispatchTasksReducer(removeToDoListAC(toDoListId));
  };

  const addToDoList = (title: string) => {
    const action = addToDoListAC(title);
    dispatchToDoListsReducer(action);
    dispatchTasksReducer(action);
  };

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

            item.filter === "active"
              ? (statusToDoList = tasks[item.id].filter((item) => !item.isDone))
              : item.filter === "completed"
              ? (statusToDoList = tasks[item.id].filter((item) => item.isDone))
              : (statusToDoList = tasks[item.id]);

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
