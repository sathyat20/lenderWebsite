/* eslint-disable no-unused-vars */
// the starting point for your redux store
// this defines what your store state will look like
import { combineReducers } from '@reduxjs/toolkit';
import postsReducer from './posts-reducer';
import authReducer from './auth-reducer';

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,

});

export default rootReducer;
