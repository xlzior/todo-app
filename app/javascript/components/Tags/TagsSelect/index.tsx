import * as React from 'react';
import { useSelector } from 'react-redux';

import { tagsSelector } from '../tagsSlice';
import './index.css';

const filterTags = (name, searchTerm) => {
  return name.toLowerCase().includes(searchTerm.toLowerCase());
}

export default function TagsSelect({ handleAddTags, isTagsOpen }) {
  const allTags = useSelector(tagsSelector);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selection, setSelection] = React.useState([]);

  const filteredTags = searchTerm === ""
    ? allTags
    : allTags.filter(tag => filterTags(tag.attributes.name, searchTerm));

  const updateSelection = (event, id) => {
    const newValue = event.target.checked;
    if (newValue) {
      setSelection(prev => prev.concat([id]));
    } else {
      setSelection(prev => prev.filter(elem => elem !== id));
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
      {filteredTags.map(({ id, attributes }) => (
        <div className="tag-selection" key={id}>
          <input type="checkbox" id={id} name={id} onChange={event => updateSelection(event, id)} />
          <label htmlFor={id}>{attributes.name}</label>
        </div>
      ))}
    </div>
  ) : null;
}