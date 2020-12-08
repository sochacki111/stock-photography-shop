import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './EditPhoto.module.css';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class EditPhoto extends Component {
  state = {
    id: this.props.match.params.id,
    title: '',
    category: '',
    price: 0
  };

  componentDidMount() {
    this.fetchPhoto();
    console.log(this.props.token);
  }
  componentDidUpdate() {
    console.log(this.state);
  }

  async fetchPhoto() {
    try {
      const response = await axios.get(
        `http://localhost:8080/photos/${this.state.id}`
      );
      this.setState({
        title: response.data.title,
        category: response.data.category,
        price: response.data.price
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  editMeetup(editedPhoto) {
    console.log('inside editMeetup');
    console.log(this.props.token);
    const config = {
      // headers: { Authorization: `${this.props.token}` }
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    console.log('config');
    console.log(config);
    axios
      .patch(
        `http://localhost:8080/photos/${this.state.id}`,
        editedPhoto,
        config
      )
      .then((response) => {
        console.log(response);
        // this.props.history.push('/');
      })
      .catch((err) => console.log(err));
  }

  photoUpdateHandler = async (e) => {
    console.log(this.state);
    const editedPhoto = {
      title: this.state.title,
      category: this.state.category,
      price: this.state.price
    };
    this.editMeetup(editedPhoto);

    e.preventDefault();
  };

  render() {
    let photo = <p style={{ textAlign: 'center' }}>Loading...</p>;
    if (this.state.id) {
      photo = (
        <div className="FullPhoto">
          <br />
          <Link className="btn grey" to="/">
            Back
          </Link>
          <h1>Edit Photo</h1>
          <form>
            {/* <img
            src={this.props.loadedPhoto.url}-
            alt="Photography"
            width="625"
            height="430"
            /> */}
            <div className="input-field">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={(event) =>
                  this.setState({ title: event.target.value })
                }
              />
            </div>
            <div className="input-field">
              <label htmlFor="category">Category</label>
              <input
                type="text"
                name="category"
                value={this.state.category}
                onChange={(event) =>
                  this.setState({ category: event.target.value })
                }
              />
            </div>
            <div className="input-field">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                value={this.state.price}
                onChange={(event) =>
                  this.setState({ price: event.target.value })
                }
              />
            </div>
            <button
              onClick={this.photoUpdateHandler}
              type="submit"
              value="Save"
              className="btn"
            >
              Update
            </button>
          </form>
        </div>
      );
    }

    return <div>{photo}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.auth.token
  };
};

export default connect(
  mapStateToProps,
  null
)(withErrorHandler(EditPhoto, axios));
