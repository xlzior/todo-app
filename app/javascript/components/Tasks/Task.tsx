import * as React from 'react';
import { useDispatch } from 'react-redux';
import { HiTrash } from 'react-icons/hi';

import { toggleCompleteThunk, updateNameThunk, deleteTaskThunk } from './tasksSlice';

export default function Task({ task, isEdit, setEdit }) {
  const dispatch = useDispatch();
  const { attributes, id } = task;
  const [newName, setNewName] = React.useState(attributes.task);
  const handleEdit = event => {
    event.preventDefault();
    dispatch(updateNameThunk({ task, newName }));
    setEdit(-1);
  }
  return (
    <div className="task">
      <input
        type="checkbox"
        name={attributes.task}
        checked={attributes.completed}
        onChange={() => dispatch(toggleCompleteThunk(task))}
      />
      { isEdit
        ? <form onSubmit={handleEdit}>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              autoFocus
            />
          </form>
        : <label htmlFor={attributes.task} onClick={() => setEdit(id)}>
            <span>{attributes.task}</span>
          </label> }
      <HiTrash className="delete" onClick={() => dispatch(deleteTaskThunk(id))} />
    </div>
  );
}