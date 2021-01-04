import { get, post, patch, del } from './utils';

// Tags CRUD

export const readTags = () => get('/api/tags?include=tasks');

// export const readTag = (id: number) => get(`/api/tags/${id}`);

export const createTag = (newName: string) => {
  return post("/api/tags?include=tasks", {
    type: "tags",
    attributes: { name: newName }
  });
}

const updateTag = (data) => {
  return patch(`/api/tags/${data.id}?include=tasks`, data);
}

export const updateTagName = ({ id, newName }) => {
  return updateTag({
    id,
    type: "tags",
    attributes: { name: newName }
  })
}

export const deleteTag = (id: string) => del(`/api/tags/${id}`, id);
