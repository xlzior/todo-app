import * as React from 'react';

import AddForm from '../../AddForm';
import { createTagThunk } from '../tagsSlice';

export default function AddTag() {
  return (
    <AddForm
      actionCreator={createTagThunk}
      item="tag"
    />
  )
}