import * as React from 'react';
import { useSelector } from 'react-redux';

import { tagsSelector } from '../tagsSlice';
import './index.css';

const isTagRelevant = (name, searchTerm) => {
  return name.toLowerCase().includes(searchTerm.toLowerCase());
}

export default function TagsSelect({ isTagsOpen, selection, setSelection }) {
  const allTags = useSelector(tagsSelector);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredTags = searchTerm === ""
    ? allTags
    : allTags.filter(tag => isTagRelevant(tag.attributes.name, searchTerm));

  const updateSelection = (event, id) => {
    const newValue = event.target.checked;
    if (newValue) {
      setSelection(prev => prev.concat([{ id, type: "tags" }]));
    } else {
      setSelection(prev => prev.filter(elem => elem.id !== id));
    }
  }

  return isTagsOpen ? (
    <div className="tags-select">
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