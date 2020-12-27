import * as React from 'react';

import AddForm from '../AddForm';
import { createTaskThunk } from './tasksSlice';

export default function AddTask() {
  return (
    <AddForm
      actionCreator={newName => createTaskThunk({
        type: "tasks",
        attributes: { task: newName, completed: false }
      })}
      item="task"
    />
  )
}