import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { fetchPhoto, updatePhoto } from '../../store/actions/photo';
import './EditPhoto.module.css';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import { UPDATE_PHOTO_RESET } from '../../store/actions/actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  form: {
    width: '50%',
    marginTop: '15vh',
    margin: 'auto'
  },
  updateButton: {
    width: '25%',
    marginTop: '1vh',
    margin: 'auto'
  },
  select: {
    textAlign: 'left'
  },
  dropZone: {
    height: '20%',
    width: '25%'
  }
}));

const EditPhoto = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const photoId = props.match.params.id;
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  const photoDetails = useSelector((state) => state.photo);
  const {
    photo,
    loading,
    error,
    success,
    updateLoading,
    updateSuccess,
    updateError
  } = photoDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    if (updateSuccess) {
      toast.success(`Photo: "${title}" updated!`);
      props.history.push(`/photos/${photoId}`);
    }
    if (!photo || photo._id !== photoId || updateSuccess) {
      dispatch({ type: UPDATE_PHOTO_RESET });
      dispatch(fetchPhoto(photoId));
    } else {
      setTitle(photo.title);
      setCategory(photo.category);
      setPrice(photo.price);
    }
  }, [photo, dispatch, photoId, updateSuccess, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(updatePhoto({ _id: photoId, title, category, price }));
    // props.history.push(`/photos/${photoId}`);
  };

  let photo2 = <p style={{ textAlign: 'center' }}>Loading...</p>;
  if (photo) {
    photo2 = (
      <div>
        <div style={{ float: 'left', marginLeft: '2vh' }}>
          <Link className="btn grey" to={`/photos/${photoId}`}>
            Cancel edit
          </Link>
        </div>
        <div className={classes.form}>
          <h1>Edit Photo</h1>
          {updateLoading && <p>Update Loading</p>}
          {updateError && <p>{updateError}</p>}
          {loading ? (
            <p>Fetch Loading</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <form onSubmit={submitHandler}>
              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="title" shrink>
                    Title
                  </InputLabel>
                  <Input
                    required={true}
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="category" shrink>
                    Category
                  </InputLabel>
                  <Select
                    id="category"
                    value={category}
                    displayEmpty
                    onChange={(e) => setCategory(e.target.value)}
                    className={classes.select}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Fashion">Fashion</MenuItem>
                    <MenuItem value="Aerial">Aerial</MenuItem>
                    <MenuItem value="Travel">Travel</MenuItem>
                    <MenuItem value="Animals">Animals</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="price">Price (in $)</InputLabel>
                  <Input
                    id="price"
                    // min="1"
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </FormControl>
              </FormGroup>
              <Button
                type="submit"
                className={classes.updateButton}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </form>
          )}
        </div>
      </div>
    );
  }
  return <div>{photo2}</div>;
};

export default withErrorHandler(EditPhoto, axios);
