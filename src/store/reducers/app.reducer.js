import { createSlice } from '@reduxjs/toolkit';
const slice = createSlice({
  name: 'count',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const selector = (state) => state.count;
export const { increment, decrement } = slice.actions;
export const { reducer } = slice;
