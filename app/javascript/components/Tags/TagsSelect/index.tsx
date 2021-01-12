import * as React from 'react';
import { useSelector } from 'react-redux';

import { filterForRelevant, useOnClickOutside } from '../../utils';
import { tagsSelector } from '../tagsSlice';

const getTagName = (tag: { attributes: { name: string } }) => {
  return tag.attributes.name;
}

export default function TagsSelect({ isTagsOpen, closeTags, selection, setSelection }) {
  const wrapperRef = React.useRef(null);
  useOnClickOutside(wrapperRef, closeTags, [selection]);
  const allTags = useSelector(tagsSelector);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredTags = filterForRelevant(allTags, getTagName, searchTerm);

  const updateSelection = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (event.target.checked) {
      setSelection(prev => prev.concat([{ id, type: "tags" }]));
    } else {
      setSelection(prev => prev.filter((elem: { id: string }) => elem.id !== id));
    }
  }

  return isTagsOpen ? (
    <div className="tags-select" ref={wrapperRef}>
      <input
        className="tag-search"
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="Filter tags"
      />
      { filteredTags.map(({ id, attributes }) => (
        <div className="tag-selection" key={id}>
          <input
            type="checkbox"
            id={id}
            name={id}
            defaultChecked={selection.find(elem => elem.id === id)}
            onChange={event => updateSelection(event, id)}
          />
          <label htmlFor={id}>{attributes.name}</label>
        </div>
      )) }
    </div>
  ) : null;
}