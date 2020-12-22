import * as React from 'react';
import { useSelector } from 'react-redux';

import Task from './Task';
import AddTask from './AddTask';
import { tasksSelector } from './tasksSlice';

export default function TaskList() {
  const tasks = useSelector(tasksSelector)
  const [editId, setEditId] = React.useState(-1);
  return (
    <div className="task-list">
      { tasks.map(task => 
        <Task
          key={task.id}
          task={task}
          isEdit={editId === task.id}
          setEdit={setEditId}
        />) }
      <AddTask />
    </div>
  );
}