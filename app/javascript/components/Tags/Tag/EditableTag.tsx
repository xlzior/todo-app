import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiPencil, HiTrash } from 'react-icons/hi';

import Tag from '.';
import { deleteTagThunk, tagSelector, updateTagNameThunk } from '../tagsSlice';

export default function EditableTag({ id, isEdit, setEdit }) {
  const tagData = useSelector(tagSelector(id));
  const [newName, setNewName] = React.useState(tagData?.attributes.name);
  const dispatch = useDispatch();

  const handleEdit = event => {
    event.preventDefault();
    dispatch(updateTagNameThunk({ id, newName }));
    setEdit(-1);
  };
  return (
    <>
      { isEdit
        ? <form onSubmit={handleEdit}>
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              autoFocus
            />
          </form>
        : <Tag id={id} /> }
      <HiPencil className="action" onClick={() => setEdit(id)}/>
      <HiTrash className="action" onClick={() => dispatch(deleteTagThunk(id))}/>
    </>
  );
}