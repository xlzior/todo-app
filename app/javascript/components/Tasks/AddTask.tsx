import * as React from 'react';

import AddForm from '../AddForm';
import { createTaskThunk, createTaskWithTagThunk } from './tasksSlice';

export default function AddTask({ withTag = null }) {
  const actionCreator = (newName: string) => {
    return withTag
      ? createTaskWithTagThunk(newName, withTag)
      : createTaskThunk(newName);
  }
  return (
    <AddForm
      actionCreator={actionCreator}
      item="task"
    />
  )
}