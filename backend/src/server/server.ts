import { Server } from 'http';
import logger from '../util/logger';
import app from '../app';

const server: Server = app.listen(app.get('port'), () => {
  logger.debug(`App is listening on port ${app.get('port')}!`);
});

export default server;
