import { getJsonData, getToken } from './utils';

export const readTasks = () => fetch('/api/tasks?include=tags').then(getJsonData);

// export const readTask = (id: number) => fetch(`/api/tasks/${id}`).then(getJsonData);

export const createTask = (data) => {
  return fetch("/api/tasks?include=tags", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getToken()
    },
    body: JSON.stringify({ data })
  }).then(getJsonData);
}

const updateTask = (data) => {
  return fetch(`/api/tasks/${data.id}?include=tags`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getToken()
    },
    body: JSON.stringify({ data }),
  }).then(getJsonData);
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

export const deleteTask = (id: number) => {
  return fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  }).then(() => { id });
}

// Task-Tag relationship

export const updateTaskTags = ({ taskId, newTags }) => {
  return fetch(`/api/tasks/${taskId}/relationships/tags`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getToken()
    },
    body: JSON.stringify({ data: newTags }),
  }).then(() => ({ taskId, newTags }));
}