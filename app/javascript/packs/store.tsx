import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../components/Tasks/tasksSlice';
import tagReducer from '../components/Tags/tagsSlice';

export default configureStore({
  reducer: {
    tasks: taskReducer,
    tags: tagReducer
  }
})