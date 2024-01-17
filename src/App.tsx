import { useState } from "react";
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

export type FilterValuesType = "all" | "active" | "completed";

export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TaskStateType = {
  [key: string]: Array<TaskType>;
};

function App() {
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

  // const [filter, setFilter] = useState<FilterValuesType>("all");
  const [todoLists, setTodoLists] =
    useState<Array<ToDoListType>>(todoListsArray);

  const [tasks, setTasks] = useState<TaskStateType>({
    [toDoListId1]: task1,
    [toDoListId2]: task2,
  });

  const removeTask = (id: string, toDoListId: string) => {
    let taskArr = tasks[toDoListId];
    let filteredTasks = taskArr.filter((item) => item.id !== id);
    tasks[toDoListId] = filteredTasks;
    setTasks({ ...tasks });
  };

  const addItem = (title: string, toDoListId: string) => {
    let newTask = { id: v1(), title: title, isDone: false };
    let taskArr = tasks[toDoListId];
    let newTasks = [newTask, ...taskArr];
    tasks[toDoListId] = newTasks;
    setTasks({ ...tasks });
  };

  const changeFilter = (filter: FilterValuesType, id: string) => {
    let todoList = todoLists.find((item) => item.id === id);
    if (todoList) {
      todoList.filter = filter;
      setTodoLists([...todoLists]);
    }
  };

  const changeTaskStatus = (
    taskId: string,
    isDone: boolean,
    toDoListId: string
  ) => {
    let taskArr = tasks[toDoListId];
    let task = taskArr.find((item) => item.id === taskId);
    if (!task) return;
    task.isDone = isDone;
    setTasks({ ...tasks });
  };

  const changeTaskTitle = (
    taskId: string,
    newTitle: string,
    toDoListId: string
  ) => {
    // достаём нужный массив по toDoListId
    let taskArr = tasks[toDoListId];
    let task = taskArr.find((item) => item.id === taskId);
    // находим нужный task
    if (!task) return;
    // меняем title
    task.title = newTitle;
    setTasks({ ...tasks });
  };

  const changeToDoListTitle = (toDoListID: string, newTitle: string) => {
    const toDoList = todoLists.find((item) => item.id === toDoListID);
    if (!toDoList) return;
    toDoList.title = newTitle;
    setTodoLists([...todoLists]);
  };

  const removeToDoList = (toDoListId: string) => {
    let task = todoListsArray.filter((item) => item.id !== toDoListId);
    setTodoLists(task);
    delete tasks[toDoListId];
    setTasks({ ...tasks });
  };

  const addToDoList = (title: string) => {
    let toDoList: ToDoListType = { id: v1(), title: title, filter: "all" };
    setTodoLists([toDoList, ...todoLists]);
    setTasks({
      ...tasks,
      [toDoList.id]: [],
    });
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

export default App;
