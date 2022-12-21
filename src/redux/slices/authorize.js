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
  },
});

export default auth.reducer;

export const { login } = auth.actions;
