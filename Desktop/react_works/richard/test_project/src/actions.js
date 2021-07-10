import {
  REQUEST_SUCCESS
} from './constants';

const requestDataAction = () => dispatch => {
  fetch('http://127.0.0.1:5000')
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_SUCCESS, payload: data }))
};

export default requestDataAction;