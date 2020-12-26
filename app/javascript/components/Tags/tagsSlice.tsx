import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { readTags, createTag, updateTag, deleteTag } from "../../../resources/api/tags"
import { SUCCESS } from '../sliceUtils';

// thunks
export const readTagsThunk = createAsyncThunk("tags/readTags", readTags);
export const createTagThunk = createAsyncThunk("tags/createTag", createTag);
export const updateTagThunk = createAsyncThunk("tags/updateTag", updateTag);
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
    builder.addCase(updateTagThunk.fulfilled, (state, action) => {
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