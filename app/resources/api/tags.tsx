import { getJsonData, getToken } from './utils';

// Tags CRUD

export const readTags = () => fetch('/api/tags').then(getJsonData);

// export const readTag = (id: number) => fetch(`/api/tags/${id}`).then(getJsonData);

export const createTag = (data) => {
  return fetch("/api/tags", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getToken()
    },
    body: JSON.stringify({ data })
  }).then(getJsonData);
}

export const updateTag = (data) => {
  return fetch(`/api/tags/${data.id}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/vnd.api+json",
      "X-CSRF-Token": getToken()
    },
    body: JSON.stringify({ data }),
  }).then(getJsonData);
}

export const deleteTag = (id: number) => {
  return fetch(`/api/tags/${id}`, {
    method: "DELETE",
  }).then(() => { id });
}

// Task-Tag relationship

export const addTagToTask = ({ taskId, tagId }) => {
  return fetch(`/api/tasks/${taskId}/relationships/tags`, {
    method: "POST",
    body: JSON.stringify({ data: [{ type: "tags", id: tagId }] })
  });
}

export const removeTagFromTask = ({ taskId, tagId }) => {
  return fetch(`/api/tasks/${taskId}/relationships/tags`, {
    method: "DELETE",
    body: JSON.stringify({ data: [{ type: "tags", id: tagId }] })
  });
}