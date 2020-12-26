import * as React from 'react';
import { useDispatch } from 'react-redux';
import { HiTrash, HiTag } from 'react-icons/hi';

import { toggleCompleteThunk, updateNameThunk, deleteTaskThunk } from './tasksSlice';
import Tag from '../Tags/Tag';
import TagsSelect from '../Tags/TagsSelect';

export default function Task({ task, isEdit, setEdit }) {
  const dispatch = useDispatch();
  const { attributes, id } = task;
  const tags = task.relationships.tags.data;
  const [newName, setNewName] = React.useState(attributes.task);
  const [isTagsOpen, setTagsOpen] = React.useState(false);
  const toggleIsTagsOpen = () => setTagsOpen(prev => !prev);

  const handleEdit = event => {
    event.preventDefault();
    dispatch(updateNameThunk({ task, newName }));
    setEdit(-1);
  }

  const handleAddTags = tagIds => {
    console.log(tagIds);
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
      {tags.map(({ id }) => <Tag key={id} id={id}/>)}
      <HiTag className="add-tag" onClick={toggleIsTagsOpen} />
      <HiTrash className="delete" onClick={() => dispatch(deleteTaskThunk(id))} />
      <TagsSelect handleAddTags={handleAddTags} isTagsOpen={isTagsOpen} />
    </div>
  );
}