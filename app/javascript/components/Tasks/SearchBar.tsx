import * as React from 'react';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <input
      type="text"
      placeholder="Search for tasks"
      className="tasks-search"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
    />
  )
}