import { Server } from 'http';
import app from '../app';

const server: Server = app.listen(3000, () => {
  console.log('App is listening on port 3000!');
});

export default server;
