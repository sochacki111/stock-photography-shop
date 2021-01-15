import React, { Component } from 'react';
import { connect } from 'react-redux';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import FormGroup from '@material-ui/core/FormGroup';

import axios from 'axios';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';

interface IProps {
  token: string;
  onAddPhoto: (photoData: any, token: any) => any;
}

interface IState {
  selectedFile: File | null;
  author: string;
  title: string;
  category: string;
  price: number;
}

class NewPhoto extends Component<IProps, IState> {
  state: IState = {
    selectedFile: null,
    author: '',
    title: '',
    category: '',
    price: 0
  };

  fileSelectedHandler = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      await this.setState({
        selectedFile: event.target.files[0]
      });
    }
  };

  fileUploadHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const fd: FormData = new FormData();
    if (this.state.selectedFile !== null) {
      fd.append('image', this.state.selectedFile, this.state.selectedFile.name);
      fd.append('author', this.state.author);
      fd.append('title', this.state.title);
      fd.append('category', this.state.category);
      fd.append('price', String(this.state.price));

      // const photo = {
      //   photoData: fd
      // };
      // TODO Display progress of upload to the user
      // const res = await axios.post('http://localhost:8080/photos', fd, {
      //   onUploadProgress: (progressEvent) => {
      //     console.log(
      //       'Upload Progress: ' +
      //         Math.round((progressEvent.loaded / progressEvent.total) * 100) +
      //         '%'
      //     );
      //   }
      // });

      // await this.props.onAddPhoto(photo, this.props.token);
      await this.props.onAddPhoto(fd, this.props.token);
    }
  };

  render() {
    return (
      <div style={{ marginTop: '15vh' }}>
        <h1>Upload photo</h1>
        {/* <form> */}
        <FormGroup>
          {/* <ul> */}
          {/* <li> */}
          {/* <label>File</label> */}
          <InputLabel htmlFor="file">File</InputLabel>
          <Input id="file" type="file" onChange={this.fileSelectedHandler} />
          {/* <input type="file" onChange={this.fileSelectedHandler} /> */}
          {/* </li> */}
          {/* <li> */}
          {/* <label>Title</label> */}
          <InputLabel htmlFor="title">Title</InputLabel>
          <TextField
            id="title"
            type="text"
            value={this.state.title}
            onChange={(event) => this.setState({ title: event.target.value })}
          />
          {/* </li> */}
          {/* <li> */}
          <InputLabel htmlFor="price">Price</InputLabel>
          <TextField
            id="price"
            type="number"
            value={this.state.price}
            onChange={(event) =>
              this.setState({ price: Number(event.target.value) })
            }
          />
          {/* </li> */}
          {/* <li>/ */}
          <label>Category</label>
          <select
            name="sortOrder"
            onChange={(event) =>
              this.setState({ category: event.target.value })
            }
          >
            <option value="">None</option>
            <option value="Fashion">Fashion</option>
            <option value="Aerial">Aerial</option>
            <option value="Travel">Travel</option>
            <option value="Animals">Animals</option>
          </select>
          {/* </li> */}
          <button onClick={this.fileUploadHandler}>Upload</button>
          {/* </ul> */}
          {/* </form> */}
        </FormGroup>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddPhoto: (photoData: any, token: any) =>
      dispatch(actions.addPhoto(photoData, token))
  };
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withErrorHandler(NewPhoto, axios));
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(NewPhoto, axios));
