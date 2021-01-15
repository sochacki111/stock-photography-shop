import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { RouteComponentProps, Link } from 'react-router-dom';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Photo } from '../../components/Photo/Photo';
import './Photos.css';
interface IProps extends RouteComponentProps {
  isAuthenticated: boolean; // TODO Delete?
  token: string;
  // TODO refactor
  match: any;
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
    sortOrder: ''
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
      const config = {
        headers: { Authorization: `Bearer ${this.props.token}` }
      };
      const response = await axios.get(
        `http://localhost:8080/photos?category=${this.state.category}&searchKeyword=${this.state.searchKeyword}&sortOrder=${this.state.sortOrder}`,
        config
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
  sortHandler = (e: any) => {
    this.setState({ sortOrder: e.target.value });
  };

  // categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
  categoryHandler = (e: any) => {
    this.setState({ category: e.target.value });
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
    let photos: JSX.Element | null = null;
    if (Array.isArray(this.state.photos)) {
      photos = (
        <GridList cellHeight={160} cols={4}>
          {this.state.photos.map((photo) => (
            <GridListTile cols={2} rows={1} key={photo._id}>
              <Link to={'/photos/' + photo._id}>
                <img
                  src={photo.url}
                  alt={photo.title}
                  // className="MuiGridListTile-imgFullHeight"
                  className="MuiGridListTile-imgFullWidth"
                />
              </Link>
            </GridListTile>
          ))}
        </GridList>
      );
    }

    return (
      <div style={{ marginTop: '15vh' }}>
        <FormGroup
          style={{ width: '20%', margin: 'auto', marginBottom: '5vh' }}
        >
          <FormControl>
            <form onSubmit={this.submitHandler} style={{ width: '100%' }}>
              <InputLabel htmlFor="searchKeyword">Search keyword</InputLabel>
              <Input
                style={{ width: '75%', float: 'left' }}
                id="searchKeyword"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  this.setState({ searchKeyword: e.target.value })
                }
              />
              <Button
                type="submit"
                style={{ marginTop: '1.2vh', width: '20%', float: 'right' }}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </form>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="sortOrder" shrink>
              Sort By
            </InputLabel>
            <Select
              id="sortOrder"
              onChange={this.sortHandler}
              style={{ textAlign: 'left' }}
              displayEmpty
              value={this.state.sortOrder}
            >
              <MenuItem value="">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="lowest">Price - Low to High</MenuItem>
              <MenuItem value="highest">Price - High to Low</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="category" shrink>
              Category
            </InputLabel>
            <Select
              name="category"
              onChange={this.categoryHandler}
              style={{ textAlign: 'left' }}
              displayEmpty
              value={this.state.category}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Fashion">Fashion</MenuItem>
              <MenuItem value="Aerial">Aerial</MenuItem>
              <MenuItem value="Travel">Travel</MenuItem>
              <MenuItem value="Animals">Animals</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
        <section className="Photos">{photos}</section>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    token: state.auth.token
  };
};

export default connect(mapStateToProps, null)(withErrorHandler(Photos, axios));
