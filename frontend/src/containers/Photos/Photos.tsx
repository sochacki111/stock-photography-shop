import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { RouteComponentProps, Link } from 'react-router-dom';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Photo } from '../../components/Photo/Photo';
import './Photos.css';

interface IProps extends RouteComponentProps {
  isAuthenticated: boolean;
  // TODO refactor
  match: any;
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
  category: string;
  searchKeyword: string;
  sortOrder: string;
}

class Photos extends Component<IProps, IState> {
  state: IState = {
    photos: [],
    error: false,
    category: this.props.match.params.id ? this.props.match.params.id : '',
    searchKeyword: '',
    sortOrder: '',
    purchasing: false // TODO delete
  };

  componentDidMount() {
    this.fetchPhotos();
  }

  componentDidUpdate(prevProps: IProps, prevState: IState) {
    if (
      this.state.category !== prevState.category ||
      this.state.sortOrder !== prevState.sortOrder
    ) {
      this.fetchPhotos();
    }
  }

  async fetchPhotos() {
    try {
      const response = await axios.get(
        `http://localhost:8080/photos?category=${this.state.category}&searchKeyword=${this.state.searchKeyword}&sortOrder=${this.state.sortOrder}`
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

  sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ sortOrder: e.target.value });
  };

  categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ category: e.target.value });
  };

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
        <ul className="filter">
          <li>
            <form onSubmit={this.submitHandler}>
              <input
                name="searchKeyword"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ searchKeyword: e.target.value })
                }
              />
              <button type="submit">Search</button>
            </form>
          </li>
          <li>
            Sort By{' '}
            <select name="sortOrder" onChange={this.sortHandler}>
              <option value="">Newest</option>
              <option value="lowest">Price - Low to High</option>
              <option value="highest">Price - High to Low</option>
            </select>
          </li>
          <li>
            Category{' '}
            <select name="sortOrder" onChange={this.categoryHandler}>
              <option value="">None</option>
              <option value="Fashion">Fashion</option>
              <option value="Aerial">Aerial</option>
              <option value="Travel">Travel</option>
              <option value="Animals">Animals</option>
            </select>
          </li>
        </ul>
        <section className="Photos">{photos}</section>
      </div>
    );
  }
}

// export default Photos;
export default withErrorHandler(Photos, axios);
