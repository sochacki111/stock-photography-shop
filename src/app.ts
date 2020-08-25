import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

import logger from './util/logger';
import { MONGODB_URI } from './util/secrets';
import * as PhotoController from './controllers/photo.controller';
import authRoutes from './routes/auth.routes';
import specialRoutes from './routes/special.routes';

// Create a new express app instance
const app: express.Application = express();

// Connect to MongoDB
const mongoUrl = String(MONGODB_URI);

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    logger.debug('DB connected!');
  })
  .catch((err) => {
    logger.fatal(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    process.exit();
  });

// Middlewares
app.use(passport.initialize());
passport.use(passportMiddleware);

// Express configuration
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/photos', PhotoController.findAll);
app.get('/photos/:id', PhotoController.findOne);
app.post(
  '/photos',
  passport.authenticate('jwt', { session: false }),
  PhotoController.createOne
);
app.patch(
  '/photos/:id',
  passport.authenticate('jwt', { session: false }),
  PhotoController.updateOne
);
app.delete(
  '/photos/:id',
  passport.authenticate('jwt', { session: false }),
  PhotoController.deleteOne
);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
});

app.use(authRoutes);
app.use(specialRoutes);

export default app;
