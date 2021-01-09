import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';

import './FullPhoto.module.css';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import TitleIcon from '@material-ui/icons/Title';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { Link } from 'react-router-dom';

class FullPhoto extends Component {
  // TODO Make use of state instead of redux props
  state = {
    loadedPhoto: null
  };

  componentDidMount() {
    // TODO anonymous no token
    console.log('componentDidMount');
    console.log(this.props.token);
    this.props.onFetchPhoto(this.props.match.params.id, this.props.token);
    // this.props.onFetchPhoto(this.props.match.params.id);
  }

  stripePromise = loadStripe(
    'pk_test_51HgY4dIKCcakOEe8LkhGBHu7mfqVlO7NSt4DcxT6tdUoImXr8IXKircdK7x9gUr7x3rIjpalkTccuD3AoBabqgHu00ZwRYWmp3'
  );
  handleClick = async (event) => {
    const stripe = await this.stripePromise;
    const response = await fetch(
      'http://localhost:8080/photos/create-session',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ photo: this.props.loadedPhoto })
      }
    );
    const session = await response.json();
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: session.id
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
        <div
          className="FullPhoto"
          style={{ marginTop: '5%', marginLeft: '5%' }}
        >
          <div style={{ float: 'left' }}>
            <img
              style={{
                maxWidth: '100%',
                height: 'auto'
              }}
              src={this.props.loadedPhoto.url}
              alt="Photography"
            />
          </div>
          <div style={{ float: 'left', marginLeft: '5%' }}>
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Author"
                  secondary={this.props.loadedPhoto.owner.email}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <TitleIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Title"
                  secondary={this.props.loadedPhoto.title}
                />
              </ListItem>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <MonetizationOnIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Price"
                  secondary={`$${this.props.loadedPhoto.price}`}
                />
              </ListItem>
            </List>
            {this.props.loadedPhoto.isAuthor ? (
              <Button
                component={Link}
                type="submit"
                color="secondary"
                variant="contained"
                style={{ backgroundColor: '#f0ad4e' }}
                to={`/photos/edit/${this.props.loadedPhoto._id}`}
              >
                Edit
              </Button>
            ) : (
              <Button
                component={Link}
                color="secondary"
                variant="contained"
                onClick={this.handleClick}
                style={{ backgroundColor: '#5cb85c' }}
                // disabled={!state.stripe || state.loading}
              >
                Checkout
              </Button>
            )}
          </div>
        </div>
      );
    }
    return <div>{photo}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    // loading: state.order.loading,
    loadedPhoto: state.photo.photo,
    token: state.auth.token
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchPhoto: (photoId, token) =>
      dispatch(actions.fetchPhoto(photoId, token))
  };
  // return {
  //   onFetchPhoto: (photoId) => dispatch(actions.fetchPhoto(photoId))
  // };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(FullPhoto, axios));
