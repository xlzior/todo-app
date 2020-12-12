import * as React from 'react';

import Task from './Task';
import AddTask from './AddTask';

export default function TaskList({ tasks }) {
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