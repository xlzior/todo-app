import * as React from 'react';
import { useSelector } from 'react-redux';
import { HiTag } from 'react-icons/hi';

import { tagSelector } from './tagsSlice';
import './Tag.css';

export default function Tag({ id }) {
  const tagData = useSelector(tagSelector(id));
  return (
    <div className="tag">
      <HiTag />
      <span>{tagData.attributes.name}</span>
    </div>
  )
}