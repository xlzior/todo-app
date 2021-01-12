import * as React from 'react';
import { useSelector } from 'react-redux';

import { tasksSelector } from './tasksSlice';
import Page from '../Page';
import TaskList from './TaskList';
import TagsPanel from '../Tags/TagsPanel';

export default function Tasks() {
  const tasks = useSelector(tasksSelector);
  return (
    <Page title="Tasks">
      <main>
        <TaskList tasks={tasks} />
        <TagsPanel />
      </main>
    </Page>
  );
}