import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8080/'
  // baseURL: `http://localhost:${process.env.PORT || 5000}`
  baseURL: 'https://stock-photography-shop.herokuapp.com/'
});

export default instance;
