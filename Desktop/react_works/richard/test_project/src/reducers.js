import {
  REQUEST_SUCCESS
} from './constants';

const initialState = {
  request: [],
}

const requestReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case REQUEST_SUCCESS:
      return Object.assign({}, state, {
        request: action.payload,
      })

    default:
      return state
  }
}

export default requestReducer;

export const getRequest = state => state.request;
