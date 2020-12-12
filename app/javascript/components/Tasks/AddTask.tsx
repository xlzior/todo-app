import * as React from 'react';
import { HiPlus } from 'react-icons/hi';

import { addTask } from '../../../resources/api';

export default function AddTask() {
  const [isAdd, setAdd] = React.useState(false);
  const [newTask, setNewTask] = React.useState("");
  const handleSubmit = event => {
    event.preventDefault();
    if (newTask.length > 0) {
      addTask({
        type: "tasks",
        attributes: { task: newTask, completed: false }
      });
    }
    setNewTask("");
  };

  if (isAdd) {
    return (
      <form className="add-task" onSubmit={handleSubmit}>
        <input
          type="text"
          autoFocus
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
        />
        <input
          type="submit"
          value="Add Task"
        />
      </form>
    );
  } else {
    return (
      <div className="add-task" onClick={() => setAdd(true)}>
        <HiPlus />
        Add task
      </div>
    );
  }
}