import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { DropzoneArea } from 'material-ui-dropzone';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../axios-photos';
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
  },
  dropZone: {
    height: '20%',
    width: '25%'
  }
}));

const NewPhoto = (props) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);

  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const onAddPhoto = async (photoData, token) =>
    dispatch(actions.addPhoto(photoData, token));

  const fileSelectedHandler = (file) => {
    setSelectedFile(file[0]);
  };

  const fileUploadHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    if (selectedFile !== null) {
      fd.append('image', selectedFile, selectedFile.name);
      fd.append('title', title);
      fd.append('category', category);
      fd.append('price', String(price));
      // TODO Refine redirect AFTER successful photo create. Right now it's just redirecting
      await onAddPhoto(fd, token);
      toast.success(`Photo: "${title}" uploaded!`);
      props.history.push('/');
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.form}>
      <h1>New photo</h1>
      <FormGroup>
        <DropzoneArea
          className={classes.dropZone}
          acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
          filesLimit={1}
          onChange={fileSelectedHandler.bind(this)}
        />
        <FormControl>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            required={true}
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
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
