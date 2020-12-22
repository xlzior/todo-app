import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TaskList from './TaskList';
import { taskStatusSelector, readTasksThunk } from './tasksSlice';

import './index.css';

interface Task {
  task: string,
  completed: boolean
}

export default function Tasks() {
  const dispatch = useDispatch();
  const taskStatus = useSelector(taskStatusSelector);

  React.useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(readTasksThunk());
    }
  }, [taskStatus, dispatch]);
  return (
    <div className="App">
      <div className="app-title">
        <h1>Tasks</h1>
      </div>
      <TaskList />
    </div>
  )
}