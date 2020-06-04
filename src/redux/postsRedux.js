import Axios from 'axios';

/* selectors */
export const getAll = ({posts}) => posts.data;
export const getLoadingState = ({posts}) => posts.loading;
export const getById = ({posts}, id) => posts.data.filter(item => item.id === id);

const compare = (a, b) => {
  const keyA = new Date(a.date);
  const keyB = new Date(b.date);

  if (keyA > keyB) { return -1; }
  if (keyA < keyB) {return 1; }

  return 0;
};

export const getPostsByDate = ({posts}) => posts.data.sort(compare);

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = (post) => ({ post, type: ADD_POST});

/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());

    Axios
      .get('http://localhost:8000/api/posts')
      .then(res => {
        dispatch(fetchSuccess(res.data.filter(item => item.status === 'published')));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchPost = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted(id));

    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};


export const postPost = function(post) {
  return dispatch => {
    dispatch(addPost(post));

    Axios
      .post(`http://localhost:8000/api/posts/add`, post)
      .then(res => {
        dispatch(addPost(res));
      })
      .catch(err => console.error('error', err));
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};
