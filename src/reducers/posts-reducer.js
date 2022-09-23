/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = {

  posts: {
    all: [],
    current: {
    },
  },
  searched: [],
  searchText: '',

};

const postsReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.FETCH_POSTS:
      draftState.all = action.payload;
      break;
    case ActionTypes.FETCH_POST:
      draftState.current = action.payload;
      break;
    case ActionTypes.SEARCH_POSTS:
      draftState.searched = action.payload[0];
      draftState.searchText = action.payload[1];
      break;
    default:
      break;
  }
}, initialState);

export default postsReducer;
