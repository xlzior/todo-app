import * as React from 'react';

import Task from './Task';
import AddTask from './AddTask';
import './index.css';

export default function TaskList({ tasks, withTag = null }) {
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
      <AddTask withTag={withTag} />
    </div>
  );
}