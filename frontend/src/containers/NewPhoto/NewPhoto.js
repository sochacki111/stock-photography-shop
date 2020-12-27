import React, { Component, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

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
  uploadButton: {
    width: '25%',
    marginTop: '1vh',
    margin: 'auto'
  },
  select: {
    textAlign: 'left'
  }
}));

const NewPhoto = (props) => {
  const [selectedFile, setSelectedFile] = useState(false);
  const [title, setTitle] = useState();
  const [category, setCategory] = useState(false);
  const [price, setPrice] = useState();

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const onAddPhoto = (photoData, token) =>
    dispatch(actions.addPhoto(photoData, token));

  const fileSelectedHandler = async (event) => {
    if (event.target.files !== null) {
      await setSelectedFile(event.target.files[0]);
    }
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (selectedFile !== null) {
      fd.append('image', selectedFile, selectedFile.name);
      fd.append('title', title);
      fd.append('category', category);
      fd.append('price', String(price));

      await onAddPhoto(fd, props.token);
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.form}>
      <h1>Upload photo</h1>
      <FormGroup>
        {/* <FormControl>
          <label htmlFor="file">
            <Button variant="raised" component="span">
              Upload
            </Button>
          </label>
          <Input
            id="file"
            type="file"
            onChange={fileSelectedHandler}
            display="none"
            accept="image/*"
            style={{ display: 'none' }}
          />
        </FormControl> */}
        <FormControl>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="price">Price (in $)</InputLabel>
          <Input
            id="price"
            // min="1"
            type="number"
            value={price || ''}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
        </FormControl>
        <FormControl>
          <InputLabel id="category">Category</InputLabel>
          <Select
            id="category"
            name="sortOrder"
            displayEmpty
            onChange={(event) => setCategory(event.target.value)}
            className={classes.select}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="Fashion">Fashion</MenuItem>
            <MenuItem value="Aerial">Aerial</MenuItem>
            <MenuItem value="Travel">Travel</MenuItem>
            <MenuItem value="Animals">Animals</MenuItem>
          </Select>
        </FormControl>
        <Button
          className={classes.uploadButton}
          onClick={fileUploadHandler}
          variant="contained"
          color="primary"
        >
          Upload
        </Button>
      </FormGroup>
    </div>
  );
};

export default withErrorHandler(NewPhoto, axios);
