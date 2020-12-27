import * as React from 'react';
import { useDispatch } from 'react-redux';
import { HiTrash } from 'react-icons/hi';

import { toggleCompleteThunk, updateNameThunk, deleteTaskThunk } from './tasksSlice';
import Tag from '../Tags/Tag';
import AddTags from './AddTags';

export default function Task({ task, isEdit, setEdit }) {
  const dispatch = useDispatch();
  const tags = task.relationships.tags.data;
  const { attributes, id } = task;
  const [newName, setNewName] = React.useState(attributes.task);

  const handleEdit = event => {
    event.preventDefault();
    dispatch(updateNameThunk({ task, newName }));
    setEdit(-1);
  }

  return (
    <div className="task item">
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
      { tags.map(({ id }) => <Tag key={id} id={id}/>) }
      <AddTags taskId={id} />
      <HiTrash className="action" onClick={() => dispatch(deleteTaskThunk(id))} />
    </div>
  );
}