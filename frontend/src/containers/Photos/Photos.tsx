import React, { Component } from 'react';
import axios from 'axios';

import { Photo } from '../../components/Photo/Photo';
import './Photos.css';

interface IProps {}

interface Photo {
  _id: string;
  title: string;
  author: string;
  keywords: string[];
  url: string;
  price: number;
}

interface IState {
  photos: Photo[];
  error: string | boolean;
}

class Photos extends Component<IProps, IState> {
  state: IState = {
    photos: [],
    error: false
  };

  componentDidMount() {
    axios
      .get('http://localhost:8080/photos')
      .then((response) => {
        const photos = response.data;
        this.setState({ photos: photos });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
      });
  }

  render() {
    // TODO Add error message while server is not responding
    // let photos = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
    // if (!this.state.error) {
    //   photos = this.state.photos.map((photo) => {
    //     return (
    //       <Photo key={photo._id} title={photo.title} author={photo.author} />
    //     );
    //   });
    // }
    const photos: JSX.Element[] = this.state.photos.map((photo: Photo) => {
      return (
        <Photo
          key={photo._id}
          title={photo.title}
          author={photo.author}
          url={photo.url}
          price={photo.price}
        />
      );
    });

    return (
      <div>
        <section className="Photos">{photos}</section>
      </div>
    );
  }
}

export default Photos;
