import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  complete_profile: false,
  tempToken: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProfile: (state, action) => {
      state.complete_profile = action.payload;
    },
    setTempToken: (state, action) => {
      state.tempToken = action.payload;
    },
    clearUser: () => {
      return {...initialState};
    },
  },
});

export const {setToken, setUser, setProfile, setTempToken, clearUser} =
  userSlice.actions;

export default userSlice.reducer;
