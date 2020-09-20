import React, { Component } from 'react';

import { Photo } from '../../components/Photo/Photo';

class Photos extends Component {
  state = {
    photos: [
      { _id: '1', title: 'my title from Photos', author: 'my author' },
      { _id: '2', title: 'my title from Photos', author: 'my author' }
    ]
  };

  render() {
    const photos = this.state.photos.map((photo) => {
      return (
        <Photo key={photo._id} title={photo.title} author={photo.author} />
      );
    });
    return <div>{photos}</div>;
  }
}

export default Photos;
