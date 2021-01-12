import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { tagsSelector } from '../tagsSlice';
import EditableTag from '../Tag/EditableTag';
import AddTag from './AddTag';

export default function TagsPanel() {
  const [editId, setEditId] = React.useState(-1);
  const dispatch = useDispatch();
  const tags = useSelector(tagsSelector);
  return (
    <div className="tags-panel">
      <h2>Tags</h2>
      <ul className="tags-list">
        { tags.map(({ id }) => 
          <li className="item" key={id}>
            <EditableTag id={id} isEdit={editId ===id} setEdit={setEditId}/>
          </li>) }
      </ul>
      <AddTag />
    </div>
  );
}