import { Server } from 'http';
import logger from '../util/logger';
import app from '../app';

const server: Server = app.listen(3000, () => {
  logger.debug('App is listening on port 3000!');
});

export default server;
