import React, { Component } from 'react';
import axios from 'axios';

interface IProps {}

interface IState {
  selectedFile: File | null;
  author: string;
  title: string;
  price: number;
}

class NewPhoto extends Component<IProps, IState> {
  state: IState = {
    selectedFile: null,
    author: '',
    title: '',
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
      fd.append('price', String(this.state.price));

      // TODO Display progress of upload to the user
      const res = await axios.post('http://localhost:8080/photos', fd, {
        onUploadProgress: (progressEvent) => {
          console.log(
            'Upload Progress: ' +
              Math.round((progressEvent.loaded / progressEvent.total) * 100) +
              '%'
          );
        }
      });
    }
  };

  render() {
    return (
      <div>
        <h1>Add a Photo</h1>
        <form>
          <label>File</label>
          <input type="file" onChange={this.fileSelectedHandler} />
        </form>
        <form>
          <label>Author</label>
          <input
            type="text"
            value={this.state.author}
            onChange={(event) => this.setState({ author: event.target.value })}
          />
        </form>
        <form>
          <label>Title</label>
          <input
            type="text"
            value={this.state.title}
            onChange={(event) => this.setState({ title: event.target.value })}
          />
        </form>
        <form>
          <label>Price</label>
          <input
            type="number"
            value={this.state.price}
            onChange={(event) =>
              this.setState({ price: Number(event.target.value) })
            }
          />
        </form>
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>
    );
  }
}

export default NewPhoto;
