import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import authSliceReducer from './slices/authorize';

// const reducer = combineReducers({});
const rootReducer = combineReducers({auth: authSliceReducer});

export default configureStore({reducer: rootReducer});
