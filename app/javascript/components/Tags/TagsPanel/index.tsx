import * as React from 'react';
import { useSelector } from 'react-redux';

import { tagsSelector } from '../tagsSlice';
import './index.css';
import Tag from '../Tag';

export default function TagsPanel() {
  const tags = useSelector(tagsSelector);
  return (
    <div className="tags-panel">
      <h2>Tags</h2>
      <ul className="tags-list">
        {tags.map(({ id }) => <li key={id}><Tag id={id} /></li>)}
      </ul>
    </div>
  );
}