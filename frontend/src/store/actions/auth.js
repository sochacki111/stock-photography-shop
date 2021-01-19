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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
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
      const { data } = await axios.post(url, authData);
      toast.success(`User: "${email}" has been created!`);
      const expirationDate = new Date(
        new Date().getTime() + data.expiresIn * 1000
      );
      localStorage.setItem('token', data.idToken);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.setItem('userId', data.localId);
      // Capture data sent from the server
      // TODO Refactor. Only dispatch on sign in
      if (isSignup) {
        dispatch(authSuccess(null, data.localId, data.userEmail));
        // SIGN IN
      } else {
        dispatch(authSuccess(data.idToken, data.localId, data.userEmail));
        dispatch(checkAuthTimeout(data.expiresIn));
        return true;
      }
    } catch (err) {
      console.log(err.response.data.error);
      dispatch(authFail(err.response.data.error));
    }
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
