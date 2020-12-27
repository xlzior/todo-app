import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usePopper } from 'react-popper';
import { HiTag } from 'react-icons/hi';

import TagsSelect from '../Tags/TagsSelect';
import { updateTaskTagsThunk, taskSelector } from './tasksSlice';

export default function AddTags({ taskId }) {
  // redux hooks
  const dispatch = useDispatch();
  const taskData = useSelector(taskSelector(taskId));

  // popper hooks
  const [ref, setRef] = React.useState(null);
  const [popper, setPopper] = React.useState(null);
  const { styles, attributes } = usePopper(ref, popper);

  const [selection, setSelection] = React.useState(taskData.relationships.tags.data);
  const [isTagsOpen, setTagsOpen] = React.useState(false);
  const openTags = () => setTagsOpen(true);
  const closeTags = () => {
    dispatch(updateTaskTagsThunk({ taskId, newTags: selection }))
    setTagsOpen(false);
  };

  return (
    <>
      <span ref={setRef} className="popper">
        <HiTag className="action" onClick={openTags} />
      </span>
      <span
        ref={setPopper}
        style={styles.popper}
        {...attributes.popper}
      >
        <TagsSelect
          isTagsOpen={isTagsOpen}
          closeTags={closeTags}
          selection={selection}
          setSelection={setSelection}
        />
      </span>
    </>
  );
}