import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { RouteComponentProps, Link } from 'react-router-dom';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Photo } from '../../components/Photo/Photo';
import './MyPhotos.css';

interface IProps extends RouteComponentProps {
  isAuthenticated: boolean;
  // TODO refactor
  match: any;
  // userEmail: string;
  userId: string;
}

interface Photo {
  _id: string;
  title: string;
  author: {
    id: string;
    email: string;
  };
  url: string;
  price: number;
}

interface IState {
  photos: Photo[];
  error: string | boolean;
}

class MyPhotos extends Component<IProps, IState> {
  state: IState = {
    photos: [],
    error: false
  };

  componentDidMount() {
    this.fetchPhotos();
  }

  // componentDidUpdate(prevProps: IProps, prevState: IState) {
  //   if (
  //     this.state.category !== prevState.category ||
  //     this.state.sortOrder !== prevState.sortOrder
  //   ) {
  //     this.fetchPhotos();
  //   }
  // }

  async fetchPhotos() {
    try {
      const response = await axios.get(
        `http://localhost:8080/photos?author=${this.props.userId}`
      );
      const photos = response.data;
      this.setState({ photos: photos });
    } catch (err) {
      console.log(err);
    }
  }

  submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.fetchPhotos();

    // this.setState({ searchKeyword: e.target })
  };

  // sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   this.setState({ sortOrder: e.target.value });
  // };

  // categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   this.setState({ category: e.target.value });
  // };

  // postSelectedHandler = (photoId: string) => {
  //   this.props.history.push('/photos/' + photoId);
  // };

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
    isAuthenticated: state.auth.token !== null,
    // userEmail: state.auth.userEmail
    userId: state.auth.userId
  };
};

// export default Photos;
export default connect(mapStateToProps)(withErrorHandler(MyPhotos, axios));
