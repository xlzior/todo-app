import * as React from 'react';

import { filterForRelevant } from '../utils';
import Task from './Task';
import AddTask from './AddTask';
import SearchBar from './SearchBar';
import './index.css';
import { FullTask } from '../types';

type TaskListProps = {
  tasks: FullTask[],
  withTag?: string,
}

const getTaskName = (task: FullTask) => {
  return task.attributes.task;
};

export default function TaskList({ tasks, withTag = null }: TaskListProps) {
  const [editId, setEditId] = React.useState("");
  const [searchTerm, setSearchTerm] = React.useState("");

  const mapToTask = (task: FullTask) => (
    <Task
      key={task.id}
      task={task}
      isEdit={editId === task.id}
      setEdit={setEditId}
    />
  );

  const tasksToDisplay = filterForRelevant(tasks, getTaskName, searchTerm).map(mapToTask);

  return (
    <div className="task-list">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      { tasksToDisplay }
      { tasksToDisplay.length === 0
        ? <p>Nothing to see here! {searchTerm === "" ? "Let's add some tasks." : "Try a different search term."}</p>
        : null }
      <AddTask withTag={withTag} />
    </div>
  );
}