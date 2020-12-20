import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';
import cors from 'cors';
import Stripe from 'stripe';
import morgan from 'morgan';

// import { v4 as uuidv4 } from 'uuid';

import { JwtStrategy, AnonymousStrategy } from './config/passport';
import logger from './util/logger';
import { MONGODB_URI, STRIPE_SECRET_ACCESS_KEY } from './util/secrets';
import authRoutes from './routes/auth.routes';
import photoRoutes from './routes/photo.routes';
import userRoutes from './routes/user.routes';

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
    logger.debug('DB connected!');
  })
  .catch((err) => {
    logger.fatal(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    process.exit();
  });

// Middlewares
app.use(cors());
app.use(passport.initialize());
app.use(morgan('dev'));

// Passport configuration
passport.use(JwtStrategy);
passport.use(AnonymousStrategy);

// Express configuration
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Stripe configuration
const stripe = new Stripe(STRIPE_SECRET_ACCESS_KEY, {
  apiVersion: '2020-08-27'
});

// Routes
app.use(authRoutes);
app.use(photoRoutes);
app.use(userRoutes);
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
});

const YOUR_DOMAIN = 'http://localhost:3000/checkout';

app.post('/create-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: req.body.photo.title,
            images: [req.body.photo.url]
          },
          unit_amount: req.body.photo.price * 100
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`
  });
  res.json({ id: session.id });
});

export default app;
