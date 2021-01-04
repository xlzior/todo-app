import { getJsonData, getToken } from './utils';

export const readTasks = () => fetch('/api/tasks?include=tags').then(getJsonData);

// export const readTask = (id: number) => fetch(`/api/tasks/${id}`).then(getJsonData);

export const createTask = async (newName: string) => {
  const response = await fetch("/api/tasks?include=tags", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getToken()
    },
    body: JSON.stringify({
      data: {
        type: "tasks",
        attributes: { task: newName, completed: false }
      }
    })
  });
  return getJsonData(response);
}

const updateTask = async (data) => {
  const response = await fetch(`/api/tasks/${data.id}?include=tags`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getToken()
    },
    body: JSON.stringify({ data }),
  });
  return getJsonData(response);
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

export const deleteTask = async (id: number) => {
  await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
  return id;
}

// Task-Tag relationship

export const updateTaskTags = async ({ taskId, newTags }) => {
  await fetch(`/api/tasks/${taskId}/relationships/tags`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getToken()
    },
    body: JSON.stringify({ data: newTags }),
  });
  return ({ taskId, newTags });
}