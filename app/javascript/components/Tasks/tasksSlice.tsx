import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { readTasks, createTask, toggleComplete, updateName, deleteTask } from "../../../resources/api/tasks";

// thunks
export const readTasksThunk = createAsyncThunk('tasks/readTasks', readTasks);
export const createTaskThunk = createAsyncThunk('tasks/createTask', createTask);
export const toggleCompleteThunk = createAsyncThunk('tasks/completeTask', toggleComplete);
export const updateNameThunk = createAsyncThunk('tasks/updateName', updateName);
export const deleteTaskThunk = createAsyncThunk('tasks/deleteTask', deleteTask);

const SUCCESS = "SUCCESS";
const LOADING = "LOADING";
const ERROR = "ERROR";

const updateTask = (state, action) => {
  state.status = SUCCESS;
  const i = state.data.findIndex(task => task.id === action.payload.id);
  state.data[i] = action.payload;
}

// slice
export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    // create task
    builder.addCase(createTaskThunk.fulfilled, (state, action) => {
      state.status = SUCCESS;
      state.data.push(action.payload);
    });

    // read tasks
    builder.addCase(readTasksThunk.pending, (state, action) => {
      state.status = LOADING;
    });
    builder.addCase(readTasksThunk.fulfilled, (state, action) => {
      state.status = SUCCESS;
      state.data = state.data.concat(action.payload);
    });
    builder.addCase(readTasksThunk.rejected, (state, action) => {
      state.status = ERROR;
      state.error = action.error.message;
    });

    // update task
    builder.addCase(toggleCompleteThunk.fulfilled, updateTask);
    builder.addCase(updateNameThunk.fulfilled, updateTask);

    // delete task
    builder.addCase(deleteTaskThunk.fulfilled, (state, action) => {
      state.status = SUCCESS;
      const i = state.data.findIndex(task => task.id === action.meta.arg);
      state.data.splice(i, 1);
    });
  }
});

// actions

// selectors
export const tasksSelector = state => state.tasks.data;
export const taskStatusSelector = state => state.tasks.status;

// reducer
export default taskSlice.reducer;
