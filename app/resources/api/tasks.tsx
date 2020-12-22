const getJsonData = response => response.json().then(({ data }) => data);

export const getTasks = () => fetch('/api/tasks').then(getJsonData);

export const getTask = (id: number) => fetch(`/api/tasks/${id}`).then(getJsonData);

const getToken = () => document.querySelector("meta[name=csrf-token]").textContent;

export const addTask = (data) => {
  return fetch("/api/tasks", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getToken()
    },
    body: JSON.stringify({ data })
  }).then(getJsonData);
}

export const deleteTask = (id: number) => {
  return fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  }).then(() => { id });
}

const updateTask = (data) => {
  return fetch(`/api/tasks/${data.id}`, {
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