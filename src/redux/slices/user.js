import {createSlice} from '@reduxjs/toolkit';

export const SET_USER = 'SET_USER';

const authSlice = createSlice({
  name: 'authorize',
  initialState: {
    loggedIn: false,
  },
  reducers: {
    setUser(state) {
      return {...state, loggedIn: true};
    },
  },
});

export default authSlice.reducer;

export const {setUser} = authSlice.actions;
