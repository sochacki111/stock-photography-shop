import React, { Component } from 'react';
import { connect } from 'react-redux';

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

  fileUploadHandler = async () => {
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
      <div>
        <h1>Add a Photo</h1>
        <form>
          <ul>
            <li>
              <label>File</label>
              <input type="file" onChange={this.fileSelectedHandler} />
            </li>
            <li>
              <label>Author</label>
              <input
                type="text"
                value={this.state.author}
                onChange={(event) =>
                  this.setState({ author: event.target.value })
                }
              />
            </li>
            <li>
              <label>Title</label>
              <input
                type="text"
                value={this.state.title}
                onChange={(event) =>
                  this.setState({ title: event.target.value })
                }
              />
            </li>
            <li>
              <label>Price</label>
              <input
                type="number"
                value={this.state.price}
                onChange={(event) =>
                  this.setState({ price: Number(event.target.value) })
                }
              />
            </li>
            <li>
              {/* <select name="sortOrder" onChange={this.categoryHandler}> */}
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
            </li>
            <button onClick={this.fileUploadHandler}>Upload</button>
          </ul>
        </form>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(NewPhoto, axios));
