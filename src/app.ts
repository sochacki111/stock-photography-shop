import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import passportMiddleware from './config/passport';
import logger from './util/logger';

import { MONGODB_URI } from './util/secrets';
import authRoutes from './routes/auth.routes';
import specialRoutes from './routes/special.routes';
import photoRoutes from './routes/photo.routes';

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
app.use(authRoutes);
app.use(specialRoutes);
app.use(photoRoutes);
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
});

export default app;
