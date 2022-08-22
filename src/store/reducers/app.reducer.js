import { createSlice } from "@reduxjs/toolkit";
const slice = createSlice({
  name: "count",
  initialState: {
    count: 0,
    activeTab: 'Default',
    token: null,
    userDetails: null,
    comments: [],
  },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    tabSelected: (state, action) => {
      state.activeTab = action.payload.tab;
    },
    login: (state, action) => {
      state.token = action.payload.token;
      state.userDetails = action.payload.userDetails;
    },
    logout: (state) => {
      state.token = null;
      state.userDetails = null;
      state.comments = [];
    },
    comments: (state, action) => {
      state.comments = action.payload.comments;
    },
  },
});

export const appStore = (state) => state;
export const { increment, decrement, tabSelected, login, logout, comments } = slice.actions;
export const selectedTab = (state) => state.activeTab;
export const userDetails = (state) => state.userDetails;
export const token = (state) => state.token;
export const userComments = (state) => state.comments;
export const { reducer } = slice;
