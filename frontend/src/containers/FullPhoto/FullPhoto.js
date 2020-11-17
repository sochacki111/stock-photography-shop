import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadStripe } from "@stripe/stripe-js";

import './FullPhoto.module.css';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
class FullPhoto extends Component {
  state = {
    loadedPhoto: null
  };

  componentDidMount() {
    this.props.onFetchPhoto(this.props.match.params.id);
  }

  stripePromise = loadStripe("pk_test_51HgY4dIKCcakOEe8LkhGBHu7mfqVlO7NSt4DcxT6tdUoImXr8IXKircdK7x9gUr7x3rIjpalkTccuD3AoBabqgHu00ZwRYWmp3");
  handleClick = async (event) => {
    const stripe = await this.stripePromise;
    const response = await fetch("http://localhost:8080/create-session", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ photo: this.props.loadedPhoto })
    });
    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      console.log(result.error.message);
    }
  };

  render() {
    let photo = <p style={{ textAlign: 'center' }}>Loading...</p>;
    if (this.props.loadedPhoto) {
      photo = (
        <div className="FullPhoto">
          <img
            src={this.props.loadedPhoto.url}
            alt="Photography"
            width="625"
            height="430"
          />
          <h4>Author: </h4>
          {this.props.loadedPhoto.author}
          <h4>Title: </h4>
          {this.props.loadedPhoto.title}
          <h4>Price: </h4>${this.props.loadedPhoto.price}
          <br />
          <button
            role="link"
            onClick={this.handleClick}
          // disabled={!state.stripe || state.loading}
          >Checkout</button>
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

const mapStateToProps = state => {
  return {
    // loading: state.order.loading,
    loadedPhoto: state.photo.photo
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchPhoto: (photoId) => dispatch(actions.fetchPhoto(photoId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(FullPhoto, axios));