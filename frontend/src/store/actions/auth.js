import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
}

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId
  };
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
}

export const auth = (email, password, isSignup) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password
    }
    let url = 'http://localhost:8080/signup';
    if (!isSignup) {
      url = 'http://localhost:8080/signin';
    }
    axios.post(url, authData)
      .then(res => {
        console.log(res);
        // Capture data sent from the server
        dispatch(authSuccess(res.data.idToken, res.data.localId));
      })
      .catch(err => {
        console.log('you hit ' + err);
        dispatch(authFail(err));
      });
  };
}