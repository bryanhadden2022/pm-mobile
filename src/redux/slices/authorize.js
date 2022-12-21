import { createSlice } from '@reduxjs/toolkit';

const auth = createSlice({
  name: 'authorize',
  initialState: {
    user: {
      loggedIn: false,
    },
  },
  reducers: {
    login(state, action) {
      state.user = { ...action.payload, loggedIn: true };
    },
    logout(state) {
      state.user = { loggedIn: false };
    },
  },
});

export default auth.reducer;

export const { login, logout } = auth.actions;
