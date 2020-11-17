import * as actionTypes from './actionTypes';
import axios from '../../axios-photos';

export const fetchPhotoSuccess = (photo) => {
  return {
    type: actionTypes.FETCH_PHOTO_SUCCESS,
    photo: photo
  };
};

export const fetchPhotoFail = (error) => {
  return {
    type: actionTypes.FETCH_PHOTO_FAIL,
    error: error
  };
};

export const fetchPhotoStart = () => {
  return {
    type: actionTypes.FETCH_PHOTO_START
  };
};

export const fetchPhoto = (photoId) => {
  return dispatch => {
    axios.get('http://localhost:8080/photos/' + photoId)
      .then(res => {
        dispatch(fetchPhotoSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchPhotoFail(err));
      });
  };
};

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
