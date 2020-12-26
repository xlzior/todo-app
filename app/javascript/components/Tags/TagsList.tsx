import * as React from 'react';
import { useSelector } from 'react-redux';

import { tagsSelector } from './tagsSlice';

export default function TagsList() {
  const tags = useSelector(tagsSelector);
  return (
    <div>
      <h2>Tags</h2>
      <ul>
        {tags.map(({ id, attributes }) => <li key={id}>{attributes.name}</li>)}
      </ul>
    </div>
  );
}