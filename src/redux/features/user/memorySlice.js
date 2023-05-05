import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './memoryAPI';
import API_URL from '../../../config';

export const getAllMemories = createAsyncThunk(
  'memory/getAllMemories',
  async () => {
    const response = await api.getAllMemories(API_URL);
    return response;
  },
);

export const createMemory = createAsyncThunk(
  'memory/createMemory',
  async (memory) => {
    const response = await api.createMemory(API_URL, memory);
    return response;
  },
);

export const updateMemory = createAsyncThunk(
  'memory/updateMemory',
  async (id, memory) => {
    const response = await api.updateMemory(API_URL, id, memory);
    return response;
  },
);

const initialState = {
  memories: [],
  loading: false,
};

export const memorySlice = createSlice({
  name: 'memory',
  initialState,
  reducers: {},
  extraReducers: {
    [getAllMemories.pending]: (state) => {
      state.loading = true;
    },
    [getAllMemories.fulfilled]: (state, action) => {
      state.loading = false;
      state.memories = action.payload;
    },
    [getAllMemories.rejected]: (state) => {
      state.loading = false;
    },
    [createMemory.pending]: (state) => {
      state.loading = true;
    },
    [createMemory.fulfilled]: (state) => {
      state.loading = false;
    },
    [createMemory.rejected]: (state) => {
      state.loading = false;
    },
    [updateMemory.pending]: (state) => {
      state.loading = true;
    },
    [updateMemory.fulfilled]: (state) => {
      state.loading = false;
    },
    [updateMemory.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default memorySlice.reducer;
