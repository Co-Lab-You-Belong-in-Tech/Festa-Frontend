import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as api from './discoverAPI';
import API_URL from '../../../config';

export const getPublicMemories = createAsyncThunk(
  'discover/getPublicMemories',
  async () => {
    const response = await api.getPublicMemories(API_URL);
    return response;
  },
);

// export const getPublicMemory = createAsyncThunk(
//   'discover/getPublicMemory',
//   async (id) => {
//     const response = await api.getMemory(API_URL, id);
//     return response;
//   }
// );

const initialState = {
  discoveries: [],
  loading: false,
};

export const discoverSlice = createSlice({
  name: 'discover',
  initialState,
  reducers: {},
  extraReducers: {
    [getPublicMemories.pending]: (state) => {
      state.loading = true;
    },
    [getPublicMemories.fulfilled]: (state, action) => {
      state.loading = false;
      state.discoveries = action.payload;
    },
    [getPublicMemories.rejected]: (state) => {
      state.loading = false;
    },
    // [getPublicMemory.pending]: (state) => {
    //   state.loading = true;
    // },
    // [getPublicMemory.fulfilled]: (state, action) => {
    //   state.loading = false;
    //   state.discoveries = action.payload;
    // },
    // [getPublicMemory.rejected]: (state) => {
    //   state.loading = false;
    // },
  },
});

export default discoverSlice.reducer;
