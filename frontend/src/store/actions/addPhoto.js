import * as actionTypes from './actionTypes';
import axios from '../../axios-addPhoto';

export const addPhotoSuccess = (id, photoData) => {
  return {
    type: actionTypes.ADD_PHOTO_SUCCESS,
    photoId: id,
    photoData: photoData
  };
};

export const addPhotoFail = (error) => {
  return {
    type: actionTypes.ADD_PHOTO_FAIL,
    error: error
  };
}

export const addPhotoStart = () => {
  return {
    type: actionTypes.ADD_PHOTO_START
  };
};

export const purchasePhoto = () => {
  return {
    type: actionTypes.ADD_PHOTO_START
  };
}

export const addPhoto = (photoData, token) => {
  return dispatch => {
    dispatch(addPhotoStart());
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    axios.post('/photos', photoData, config)
      .then(response => {
        console.log(response.data);
        dispatch(addPhotoSuccess(response.data._id, photoData));
      })
      .catch(error => {
        dispatch(addPhotoFail(error));
      });
  };
};

export const addPhotoInit = () => {
  return {
    type: actionTypes.ADD_PHOTO_INIT
  };
};
