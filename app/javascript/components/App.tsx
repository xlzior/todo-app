import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TaskList from './Tasks/TaskList';
import { taskStatusSelector, readTasksThunk } from './Tasks/tasksSlice';
import { tagsStatusSelector, readTagsThunk } from './Tags/tagsSlice';

import TagsPanel from './Tags/TagsPanel';
import Page from './Page';

interface Task {
  task: string,
  completed: boolean
}

export default function Tasks() {
  const dispatch = useDispatch();
  const taskStatus = useSelector(taskStatusSelector);
  const tagStatus = useSelector(tagsStatusSelector);

  // const [isPanelOpen, setPanelOpen] = React.useState(false);
  // TODO: button to hide and show tags panel

  React.useEffect(() => { // tasks
    if (taskStatus === 'idle') dispatch(readTasksThunk());
  }, [taskStatus, dispatch]);

  React.useEffect(() => { // tags
    if (tagStatus === 'idle') dispatch(readTagsThunk());
  }, [tagStatus, dispatch]);

  return (
    <Page title="Tasks">
      <main>
        <TaskList />
        <TagsPanel />
      </main>
    </Page>
  )
}