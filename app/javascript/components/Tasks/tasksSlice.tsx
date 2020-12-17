import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTasks, addTask, toggleComplete, updateName, deleteTask } from "../../../resources/api";

// thunks
export const getTasksThunk = createAsyncThunk('tasks/getTasks', getTasks);
export const addTaskThunk = createAsyncThunk('tasks/addTask', addTask);
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
    builder.addCase(getTasksThunk.pending, (state, action) => {
      state.status = LOADING;
    });
    builder.addCase(getTasksThunk.fulfilled, (state, action) => {
      state.status = SUCCESS;
      state.data = state.data.concat(action.payload);
    });
    builder.addCase(getTasksThunk.rejected, (state, action) => {
      state.status = ERROR;
      state.error = action.error.message;
    });
    builder.addCase(addTaskThunk.fulfilled, (state, action) => {
      state.status = SUCCESS;
      state.data.push(action.payload);
    });
    builder.addCase(toggleCompleteThunk.fulfilled, updateTask);
    builder.addCase(updateNameThunk.fulfilled, updateTask);
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
