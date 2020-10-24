import React, { Component } from 'react';
import axios from 'axios';

import './FullPhoto.module.css';

class FullPhoto extends Component {
  state = {
    loadedPhoto: null
  };

  componentDidMount() {
    this.loadData();
    console.log(this.state.loadedPhoto);
  }

  // componentDidUpdate() {
  //     console.log('')
  //     this.loadData();
  // }

  loadData() {
    if (this.props.match.params.id) {
      if (!this.state.loadedPhoto || (this.state.loadedPhoto && this.state.loadedPhoto.id !== +this.props.match.params.id)) {
        console.log('loadData');
        axios.get(`http://localhost:8080/photos/${this.props.match.params.id}`)
          .then(response => {
            this.setState({ loadedPhoto: response.data });
          });
      }
    }
  }

  buyPhotoHandler = () => {
    // axios.delete(`/photos/${this.props.match.params.id}`)
    //     .then(response => {
    //         console.log(response);
    //     });
  }

  render() {
    let photo = <p style={{ textAlign: 'center' }}>Please select a Photo!</p>;
    if (this.props.match.params.id) {
      photo = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }
    if (this.state.loadedPhoto) {
      photo = (
        <div className="FullPhoto">
          <img
            src={this.state.loadedPhoto.url}
            alt="thumbnail of photography to buy"
            width="625"
            height="430"
          />
          <div className="Edit">
            <button onClick={this.buyPhotoHandler} className="Delete">BUY</button>
          </div>
          <h4>Author: </h4>
          {this.state.loadedPhoto.author}
          <h4>Title: </h4>
          {this.state.loadedPhoto.title}
          <h4>Price: </h4>${this.state.loadedPhoto.price}
        </div>
      );
    }

    return (
      <div>
        {photo}
      </div>
    );
  }
}

export default FullPhoto;