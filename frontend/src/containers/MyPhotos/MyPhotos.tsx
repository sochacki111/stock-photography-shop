import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { RouteComponentProps, Link } from 'react-router-dom';
import GridListTile from '@material-ui/core/GridListTile';
import GridList from '@material-ui/core/GridList';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Photo } from '../../components/Photo/Photo';
import './MyPhotos.css';

interface IProps extends RouteComponentProps {
  match: any;
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
  error: boolean;
}

class MyPhotos extends Component<IProps, IState> {
  state: IState = {
    photos: [],
    error: false
  };

  componentDidMount() {
    this.fetchPhotos();
  }

  async fetchPhotos() {
    try {
      const response = await axios.get(
        `http://localhost:8080/users/${this.props.userId}/photos`
      );
      this.setState({ photos: response.data });
    } catch (err) {
      this.setState({ error: true });
    }
  }

  submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.fetchPhotos();
  };

  render() {
    let photos: JSX.Element | null = null;

    if (Array.isArray(this.state.photos)) {
      photos = (
        <GridList cellHeight={160} cols={4} style={{ marginTop: '15vh' }}>
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
      <div>
        <section className="Photos">{photos}</section>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    userId: state.auth.userId
  };
};

export default connect(mapStateToProps)(withErrorHandler(MyPhotos, axios));
