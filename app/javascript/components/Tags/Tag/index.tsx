import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiTag } from 'react-icons/hi';

import { tagSelector } from '../tagsSlice';

export default function Tag({ id }) {
  const tagData = useSelector(tagSelector(id));
  return (
    <Link to={`/tags/${id}`} className="tag">
      <HiTag />
      <span>{tagData?.attributes.name}</span>
    </Link>
  )
}