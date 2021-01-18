import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { fetchPhoto } from '../../store/actions/photo';
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

const FullPhoto = (props) => {
  const dispatch = useDispatch();
  const photoId = props.match.params.id;
  const stripePromise = loadStripe(
    'pk_test_51HgY4dIKCcakOEe8LkhGBHu7mfqVlO7NSt4DcxT6tdUoImXr8IXKircdK7x9gUr7x3rIjpalkTccuD3AoBabqgHu00ZwRYWmp3'
  );
  // TODO Fix first load 'loadedPhoto' as null
  const loadedPhoto = useSelector((state) => state.photo.photo);
  // const photoDetails = useSelector((state) => state.photo.photo);
  // const { isAuthor, loadedPhoto } = photoDetails;
  const token = useSelector((state) => state.auth.token);
  useEffect(() => {
    dispatch(fetchPhoto(photoId));
  }, [dispatch, photoId]);

  const handleClick = async (event) => {
    try {
      const stripe = await stripePromise;
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const { data } = await axios.post(
        'http://localhost:8080/photos/create-session',
        { photo: loadedPhoto },
        config
      );
      const session = await data;
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
    } catch (err) {
      console.log(err);
    }
  };

  let photo = <p style={{ textAlign: 'center' }}>Loading...</p>;
  if (loadedPhoto) {
    photo = (
      <div className="FullPhoto" style={{ marginTop: '5%', marginLeft: '5%' }}>
        <div style={{ float: 'left' }}>
          <img
            style={{
              maxWidth: '100%',
              height: 'auto'
            }}
            src={loadedPhoto.url}
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
                secondary={loadedPhoto.owner.email}
              />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <TitleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Title" secondary={loadedPhoto.title} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MonetizationOnIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Price"
                secondary={`$${loadedPhoto.price}`}
              />
            </ListItem>
          </List>
          {loadedPhoto.isAuthor ? (
            <Button
              component={Link}
              type="submit"
              color="secondary"
              variant="contained"
              style={{ backgroundColor: '#f0ad4e' }}
              to={`/photos/edit/${loadedPhoto._id}`}
            >
              Edit
            </Button>
          ) : (
            <Button
              component={Link}
              color="secondary"
              variant="contained"
              onClick={handleClick}
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
};

export default withErrorHandler(FullPhoto, axios);
