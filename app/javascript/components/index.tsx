import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TaskList from './Tasks/TaskList';
import { taskStatusSelector, readTasksThunk } from './Tasks/tasksSlice';
import { tagsStatusSelector, readTagsThunk } from './Tags/tagsSlice';

import './index.css';
import TagsList from './Tags/TagsList';

interface Task {
  task: string,
  completed: boolean
}

export default function Tasks() {
  const dispatch = useDispatch();
  const taskStatus = useSelector(taskStatusSelector);
  const tagStatus = useSelector(tagsStatusSelector);

  React.useEffect(() => { // tasks
    if (taskStatus === 'idle') dispatch(readTasksThunk());
  }, [taskStatus, dispatch]);

  React.useEffect(() => { // tags
    if (tagStatus === 'idle') dispatch(readTagsThunk());
  }, [tagStatus, dispatch]);

  return (
    <div className="App">
      <div className="app-title">
        <h1>Tasks</h1>
      </div>
      <main>
        <TaskList />
        <TagsList />
      </main>
    </div>
  )
}