import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { readTags, createTag, updateTagName, deleteTag } from "../../../resources/api/tags"
import { SUCCESS } from '../sliceUtils';
import { updateTaskTagsThunk } from "../Tasks/tasksSlice";

// thunks
export const readTagsThunk = createAsyncThunk("tags/readTags", readTags);
export const createTagThunk = createAsyncThunk("tags/createTag", createTag);
export const updateTagNameThunk = createAsyncThunk("tags/updateTagName", updateTagName);
export const deleteTagThunk = createAsyncThunk("tags/deleteTag", deleteTag);

export const tagSlice = createSlice({
  name: "tags",
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    // create tag
    builder.addCase(createTagThunk.fulfilled, (state, action) => {
      state.status = SUCCESS;
      state.data.push(action.payload);
    });

    // read tags
    builder.addCase(readTagsThunk.fulfilled, (state, action) => {
      state.status = SUCCESS;
      state.data = state.data.concat(action.payload);
    });

    // update tag
    builder.addCase(updateTagNameThunk.fulfilled, (state, action) => {
      state.status = SUCCESS;
      const i = state.data.findIndex(tag => tag.id === action.payload.id);
      state.data[i] = action.payload;
    });

    // delete tag
    builder.addCase(deleteTagThunk.fulfilled, (state, action) => {
      state.status = SUCCESS;
      const i = state.data.findIndex(tag => tag.id === action.meta.arg);
      state.data.splice(i, 1);
    });

    // update task-tag relationship -> update tag's tasks
    builder.addCase(updateTaskTagsThunk.fulfilled, (state, action) => {
      state.status = SUCCESS;
      const { taskId, newTags } = action.meta.arg;
      state.data.forEach(tag => {
        const taskPrevHadTag = tag.relationships.tasks.data.find(task => task.id === taskId);
        const taskNowHasTag = newTags.find(newTag => newTag.id === tag.id);
        if (!taskPrevHadTag && taskNowHasTag) { // add task to tag
          tag.relationships.tasks.data.push({ type: "tasks", id: taskId });
        }
        if (taskPrevHadTag && !taskNowHasTag) { // remove task from tag
          tag.relationships.tasks.data = tag.relationships.tasks.data.filter(
            ({ id }) => id !== taskId
          );
        }
      })
    });
  }
})

// selectors
export const tagsSelector = state => state.tags.data;
export const tagsStatusSelector = state => state.tags.status;
export const tagSelector = id => state => {
  const tags = tagsSelector(state);
  return tags.find(tag => tag.id === id);
}

// reducer
export default tagSlice.reducer;