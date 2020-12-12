export const getTasks = async () => {
  const response = await fetch("/api/tasks");
  const { data } = await response.json();
  return data;
}

export const getTask = async (id: number) => {
  const response = await fetch(`/api/tasks/${id}`);
  const { data } = await response.json();
  return data;
}

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
  })
}

export const deleteTask = (id: number) => {
  return fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  })
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
  });
}

export const updateName = ({id, type}, newName: string) => {
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