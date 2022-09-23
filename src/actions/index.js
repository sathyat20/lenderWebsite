export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  FETCH_POST: 'FETCH_POST',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  SEARCH_POSTS: 'SEARCH_POSTS',
};

export const ROOT_URL = 'https://lender-backend.onrender.com/api';
const API_KEY = '?key=kevine_lender';
const axios = require('axios').default;

export function fetchPosts() {
  console.log('fetch called front end');
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    });
  };
}

export function createPost(post, navigate) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/posts`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_POST,
        payload: response.data,
      });
      navigate('/');
    });
  };
}
// trigger to deauth if there is error
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function updatePost(post, id, navigate) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${id}?${API_KEY}`, post, { headers: { authorization: localStorage.getItem('token') } }).then((response) => {
      dispatch({
        type: ActionTypes.FETCH_POST,
        payload: response.data,
      });
      navigate(-1);
    });
  };
}

export function fetchPost(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/posts/${id}?${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    });
  };
}

export function deletePost(id, navigate) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}?${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } }).then(() => {
      navigate('/');
    });
  };
}

export function signinUser({ email, password }, navigate) {
  return async (dispatch) => {
    axios.post(`${ROOT_URL}/signin${API_KEY}`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    }).catch((error) => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

export function borrowsigninUser({ email, password }, navigate) {
  return async (dispatch) => {
    axios.post(`${ROOT_URL}/signin${API_KEY}`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
      navigate(-1);
    }).catch((error) => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

export function signupUser({ userName, email, password }, navigate) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup${API_KEY}`, { userName, email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER, payload: response.data });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    }).catch((error) => {
      dispatch(authError(`Sign Up Failed: ${error.response.data}`));
    });
  };
}

// deletes token from localstorage
// and deauths
export function signoutUser(navigate) {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    navigate('/');
  };
}

export function searchPosts(query) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/results?q=${query}?${API_KEY}`).then((response) => {
      dispatch({ type: ActionTypes.SEARCH_POSTS, payload: [response.data, query] });
    });
  };
}
