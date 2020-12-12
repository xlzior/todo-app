import * as React from 'react';
import { HiTrash } from 'react-icons/hi';
import { toggleComplete, updateName, deleteTask } from '../../../resources/api';

export default function Task({ task, isEdit, setEdit }) {
  const { attributes, id } = task;
  const [newName, setNewName] = React.useState(attributes.task);
  const handleSubmit = event => {
    event.preventDefault();
    updateName(task, newName);
    setEdit(-1);
  }
  return (
    <div className="task">
      <input
        type="checkbox"
        name={attributes.task}
        checked={attributes.completed}
        onChange={() => toggleComplete(task)}
      />
      { isEdit
        ? <form onSubmit={handleSubmit}>
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
      <HiTrash className="delete" onClick={() => deleteTask(id)} />
    </div>
  );
}