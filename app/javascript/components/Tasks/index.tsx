import * as React from 'react';

import TaskList from './TaskList';
import { getTasks } from '../../../resources/api';

import './index.css';

interface Task {
  task: string,
  completed: boolean
}

export default function Tasks() {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  React.useEffect(() => {
    getTasks().then(setTasks);
  }, []);
  return (
    <div className="App">
      <div className="app-title">
        <h1>Tasks</h1>
      </div>
      <TaskList tasks={tasks} />
    </div>
  )
}