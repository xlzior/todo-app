import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../components/Tasks/tasksSlice';

export default configureStore({
  reducer: {
    tasks: taskReducer
  }
})