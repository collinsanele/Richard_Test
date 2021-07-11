import {
  REQUEST_SUCCESS
} from './constants';

const requestDataAction = () => dispatch => {
  const req_option = {
    headers: {
      'Access-Control-Allow-Origin':'*'
    }
  }

  fetch('http://127.0.0.1:5000', req_option)
    .then(response => response.json())
    .then(data => dispatch({ type: REQUEST_SUCCESS, payload: data }))
};

export default requestDataAction;