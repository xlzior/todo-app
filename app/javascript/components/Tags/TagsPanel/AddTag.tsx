import * as React from 'react';

import AddForm from '../../AddForm';
import { createTagThunk } from '../tagsSlice';

export default function AddTag() {
  return (
    <AddForm
      actionCreator={newName => createTagThunk({
        type: "tags",
        attributes: { name: newName }
      })}
      item="tag"
    />
  )
}