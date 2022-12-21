import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// reducers
import authSliceReducer from './slices/authorize';
import app from './slices/app';

// const reducer = combineReducers({});
const rootReducer = combineReducers({ auth: authSliceReducer, app });

export default configureStore({ reducer: rootReducer });
