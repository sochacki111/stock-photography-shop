import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  photo: null,
  loading: false,
  success: false,
  error: null,
  updateLoading: false,
  updateSuccess: false,
  updateError: null
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
  return updateObject(state, { loading: true });
};

const fetchPhotoSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    photo: action.photo
  });
};

const fetchPhotoFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.payload
  });
};

const updatePhotoSuccess = (state, action) => {
  return updateObject({ updateLoading: false, updateSuccess: true });
};

const updatePhotoFail = (state, action) => {
  return updateObject({ updateLoading: false, updateError: action.payload });
};

const updatePhotoRequest = (state, action) => {
  return updateObject(state, { updateLoading: true });
};

const updatePhotoReset = (state, action) => {
  return updateObject(state, {
    updateLoading: false,
    updateSuccess: false,
    updateError: null
  });
};

const updatePhotoSuccess = (state, action) => {
  return updateObject({ updateLoading: false, updateSuccess: true });
};

const updatePhotoFail = (state, action) => {
  return updateObject({ updateLoading: false, updateError: action.payload });
};

const updatePhotoRequest = (state, action) => {
  return updateObject(state, { updateLoading: true });
};

const updatePhotoReset = (state, action) => {
  return updateObject(state, {});
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PHOTO_INIT:
      return addPhotoInit(state, action);
    case actionTypes.ADD_PHOTO_START:
      return addPhotoStart(state, action);
    case actionTypes.ADD_PHOTO_SUCCESS:
      return addPhotoSuccess(state, action);
    case actionTypes.ADD_PHOTO_FAIL:
      return addPhotoFail(state, action);
    case actionTypes.PURCHASE_PHOTO:
      return purchasePhotoSuccess(state, action);
    case actionTypes.FETCH_PHOTO_START:
      return fetchPhotoStart(state, action);
    case actionTypes.FETCH_PHOTO_SUCCESS:
      return fetchPhotoSuccess(state, action);
    case actionTypes.FETCH_PHOTO_FAIL:
      return fetchPhotoFail(state, action);
    case actionTypes.UPDATE_PHOTO_REQUEST:
      return updatePhotoRequest(state, action);
    case actionTypes.UPDATE_PHOTO_SUCCESS:
      return updatePhotoSuccess(state, action);
    case actionTypes.UPDATE_PHOTO_FAIL:
      return updatePhotoFail(state, action);
    case actionTypes.UPDATE_PHOTO_RESET:
      return updatePhotoReset(state, action);
    default:
      return state;
  }
};

export default reducer;
