import {createSlice} from '@reduxjs/toolkit';

const auth = createSlice({
  name: 'authorize',
  initialState: {
    loggedIn: false,
    user: null,
  },
  reducers: {
    authorize(state) {
      state.loggedIn = true;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default auth.reducer;

export const {authorize, setUser} = auth.actions;
