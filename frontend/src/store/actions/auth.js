import axios from 'axios';
import * as actionTypes from './actionTypes';
import { toast } from 'react-toastify';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId, userEmail) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    userEmail: userEmail
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return async (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password
    };
    let url = 'http://localhost:8080/signup';
    if (!isSignup) {
      url = 'http://localhost:8080/signin';
    }
    try {
      const res = await axios.post(url, authData);
      toast.success(`User: "${email}" has been created!`);
      // Capture data sent from the server
      // TODO Refactor. Only dispatch on sign in
      if (isSignup) {
        dispatch(authSuccess(null, res.data.localId, res.data.userEmail));
      } else {
        dispatch(
          authSuccess(res.data.idToken, res.data.localId, res.data.userEmail)
        );
        dispatch(checkAuthTimeout(res.data.expiresIn));
        return true;
      }
    } catch (err) {
      console.log(err.response.data.error);
      dispatch(authFail(err.response.data.error));
    }
  };
};
