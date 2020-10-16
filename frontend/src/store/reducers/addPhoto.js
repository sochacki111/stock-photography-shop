import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  photos: [],
  loading: false,
  added: false
};

const addPhotoInit = (state, action) => {
  return updateObject(state, { added: false });
};

const addPhotoStart = (state, action) => {
  return updateObject(state, { loading: false });
};

const addPhotoSuccess = (state, action) => {
  const newPhoto = updateObject(action.photoData, { id: action.photoId });
  console.log(newPhoto);
  console.log(action);
  return updateObject(state, {
    loading: false,
    added: true,
    photos: state.photos.concat(newPhoto)
  });
};

const addPhotoFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PHOTO_INIT: return addPhotoInit(state, action);
    case actionTypes.ADD_PHOTO_START: return addPhotoStart(state, action);
    case actionTypes.ADD_PHOTO_SUCCESS: return addPhotoSuccess(state, action);
    case actionTypes.ADD_PHOTO_FAIL: return addPhotoFail(state, action);
    default: return state;
  }
};

export default reducer;