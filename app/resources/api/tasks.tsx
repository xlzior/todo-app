import { get, post, patch, del } from './utils';

// Tasks CRUD

export const readTasks = () => get('/api/tasks?include=tags');

// export const readTask = (id: string) => get(`/api/tasks/${id}`);

export const createTask = (newName: string) => {
  return post("/api/tasks?include=tags", {
    type: "tasks",
    attributes: { task: newName, completed: false }
  });
}

const updateTask = (data) => {
  return patch(`/api/tasks/${data.id}?include=tags`, data);
}

export const updateName = ({ task: {id, type}, newName }) => {
  return updateTask({
    id,
    type,
    attributes: { task: newName },
  });
}

export const toggleComplete = ({ id, type, attributes }) => {
  return updateTask({
    id,
    type,
    attributes: { completed: !attributes.completed },
  });
}

export const deleteTask = (id: string) =>  del(`/api/tasks/${id}`, id);

// Task-Tag relationship

export const updateTaskTags = async ({ taskId, newTags }) => {
  return patch(`/api/tasks/${taskId}/relationships/tags`, newTags, { taskId, newTags });
}
