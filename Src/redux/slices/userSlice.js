import { createSlice } from '@reduxjs/toolkit';
import { cloneElement } from 'react';

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      console.log(state, action.payload);

      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProfile: (state, action) => {
      state.complete_profile = action.payload;
    },
  },
});

export const { setToken, setUser, setProfile, setTempToken } =
  userSlice.actions;

export default userSlice.reducer;
