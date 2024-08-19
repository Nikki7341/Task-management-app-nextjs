import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskState, TaskData } from "@/modals/interfaces";

const defaultState: TaskState = {
  todo: [],
  doing: [],
  done: [],
};

const loadTasks = (): TaskState => {
  if (typeof window === "undefined") {
    return defaultState;
  }
  const serializedState = localStorage.getItem("tasks");
  if (serializedState === null) {
    return defaultState;
  }
  return JSON.parse(serializedState);
};

const saveTasks = (state: TaskState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("tasks", serializedState);
  } catch (e) {
    console.error("Could not save tasks to localStorage", e);
  }
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: loadTasks(),
  reducers: {
    addTask: (state, action: PayloadAction<TaskData>) => {
      const { status } = action.payload;
      state[status].push(action.payload);
      saveTasks(state);
    },
    editTask: (state, action: PayloadAction<TaskData>) => {
      const { id, status, name, description } = action.payload;
      const task = state[status].find((task) => task.id === id);
      if (task) {
        task.name = name;
        task.description = description;
        saveTasks(state);
      }
    },
    deleteTask: (state:any, action: PayloadAction<{ id: number; status: string }>) => {
      const { id, status } = action.payload;
      state[status] = state[status].filter((task: TaskData) => task.id !== id);
      saveTasks(state);
    },
    moveTask: (
      state:any,
      action: PayloadAction<{ id: number; fromStatus: string; toStatus: string }>
    ) => {
      const { id, fromStatus, toStatus } = action.payload;
      const taskList = state[fromStatus];
      const taskIndex = taskList.findIndex((task: TaskData) => task.id === id);
      if (taskIndex >= 0) {
        const [task] = taskList.splice(taskIndex, 1);
        task.status = toStatus;
        state[toStatus].push(task);
        saveTasks(state);
      }
    },
  },
});

export const { addTask, editTask, deleteTask, moveTask } = tasksSlice.actions;
export default tasksSlice.reducer;
