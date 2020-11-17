import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  photo: null,
  photos: [],
  loading: false,
  added: false,
  purchased: false
};

const addPhotoInit = (state, action) => {
  return updateObject(state, { added: false });
};

const addPhotoStart = (state, action) => {
  return updateObject(state, { loading: false });
};

const addPhotoSuccess = (state, action) => {
  const newPhoto = updateObject(action.photoData, { id: action.photoId });
  return updateObject(state, {
    loading: false,
    added: true,
    photos: state.photos.concat(newPhoto)
  });
};

const addPhotoFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const purchasePhotoSuccess = (state, action) => {
  return updateObject(state, { purchased: true });
};

const fetchPhotoStart = (state, action) => {
  return updateObject(state, { photo: action.photo });
};

const fetchPhotoSuccess = (state, action) => {
  return updateObject(state, {
    photo: action.photo
  });
};

const fetchPhotoFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PHOTO_INIT: return addPhotoInit(state, action);
    case actionTypes.ADD_PHOTO_START: return addPhotoStart(state, action);
    case actionTypes.ADD_PHOTO_SUCCESS: return addPhotoSuccess(state, action);
    case actionTypes.ADD_PHOTO_FAIL: return addPhotoFail(state, action);
    case actionTypes.PURCHASE_PHOTO: return purchasePhotoSuccess(state, action);
    case actionTypes.FETCH_PHOTO_START: return fetchPhotoStart(state, action);
    case actionTypes.FETCH_PHOTO_SUCCESS: return fetchPhotoSuccess(state, action);
    case actionTypes.FETCH_PHOTO_FAIL: return fetchPhotoFail(state, action);
    default: return state;
  }
};

export default reducer;