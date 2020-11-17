import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { RouteComponentProps, Switch, Route, Link } from 'react-router-dom';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Photo } from '../../components/Photo/Photo';
import './Photos.css';

interface IProps extends RouteComponentProps {
  isAuthenticated: boolean;
}

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
  purchasing: boolean;
}

class Photos extends Component<IProps, IState> {
  state: IState = {
    photos: [],
    error: false,
    purchasing: false
  };

  componentDidMount() {
    axios
      .get('http://localhost:8080/photos')
      .then((response) => {
        const photos = response.data;
        this.setState({ photos: photos });
        console.log(photos);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
      });
    console.log(process.env.REACT_APP_KEY);
  }

  // purchaseConfirmedHandler = () => {
  //   if (this.props.isAuthenticated) {
  //       this.setState( { purchasing: true } );
  //   }
  //   // else {
  //   //     this.props.onSetAuthRedirectPath('/checkout');
  //   //     this.props.history.push('/auth');
  //   // }
  // }

  postSelectedHandler = (photoId: string) => {
    this.props.history.push('/photos/' + photoId);
  };

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
        <Link to={'/photos/' + photo._id} key={photo._id}>
          <Photo
            title={photo.title}
            author={photo.author}
            url={photo.url}
            price={photo.price}
            // purchaseConfirmed={this.purchaseConfirmedHandler}
            // clicked={() => this.postSelectedHandler( photo._id )}
          ></Photo>
        </Link>
      );
    });

    return (
      <div>
        <section className="Photos">{photos}</section>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    // ings: state.burgerBuilder.ingredients,
    // price: state.burgerBuilder.totalPrice,
    // error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//       onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
//   };
// };

// export default Photos;
export default connect(mapStateToProps, null)(withErrorHandler(Photos, axios));
