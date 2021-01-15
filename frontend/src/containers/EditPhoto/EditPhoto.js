import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './EditPhoto.module.css';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import FormGroup from '@material-ui/core/FormGroup';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  form: {
    width: '50%',
    marginTop: '15vh',
    margin: 'auto'
  },
  updateButton: {
    width: '25%',
    marginTop: '1vh',
    margin: 'auto'
  },
  select: {
    textAlign: 'left'
  },
  dropZone: {
    height: '20%',
    width: '25%'
  }
});

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

  async editPhoto(editedPhoto) {
    console.log('inside editMeetup');
    const config = {
      // headers: { Authorization: `${this.props.token}` }
      headers: { Authorization: `Bearer ${this.props.token}` }
    };
    const response = await axios.patch(
      `http://localhost:8080/photos/${this.state.id}`,
      editedPhoto,
      config
    );
    return true;
  }

  photoUpdateHandler = async (e) => {
    console.log('photoUpdateHandler before');
    const editedPhoto = {
      title: this.state.title,
      category: this.state.category,
      price: this.state.price
    };
    await this.editPhoto(editedPhoto);
    toast.success(`Photo: "${editedPhoto.title}" updated!`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    this.props.history.push(`/photos/${this.state.id}`);
    console.log('photoUpdateHandler after');
    // e.preventDefault();
  };

  render() {
    const { classes } = this.props;
    let photo = <p style={{ textAlign: 'center' }}>Loading...</p>;
    if (this.state.id) {
      photo = (
        <div>
          <div style={{ float: 'left', marginLeft: '2vh' }}>
            <Link className="btn grey" to={`/photos/${this.state.id}`}>
              Cancel edit
            </Link>
          </div>
          <div className={classes.form}>
            <h1>Edit Photo</h1>
            <form>
              <FormGroup>
                <FormControl>
                  <InputLabel htmlFor="title" shrink>
                    Title
                  </InputLabel>
                  <Input
                    required={true}
                    id="title"
                    type="text"
                    value={this.state.title}
                    onChange={(event) =>
                      this.setState({ title: event.target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="category" shrink>
                    Category
                  </InputLabel>
                  <Select
                    id="category"
                    value={this.state.category}
                    displayEmpty
                    onChange={(event) =>
                      this.setState({ category: event.target.value })
                    }
                    className={classes.select}
                  >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Fashion">Fashion</MenuItem>
                    <MenuItem value="Aerial">Aerial</MenuItem>
                    <MenuItem value="Travel">Travel</MenuItem>
                    <MenuItem value="Animals">Animals</MenuItem>
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor="price">Price (in $)</InputLabel>
                  <Input
                    id="price"
                    // min="1"
                    type="number"
                    value={this.state.price}
                    onChange={(event) =>
                      this.setState({ price: event.target.value })
                    }
                  />
                </FormControl>
              </FormGroup>
              <Button
                onClick={this.photoUpdateHandler}
                className={classes.updateButton}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
            </form>
          </div>
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
)(withErrorHandler(withStyles(styles, { withTheme: true })(EditPhoto), axios));
// export default connect(
//   mapStateToProps,
//   null
// )(withErrorHandler(EditPhoto, axios));
