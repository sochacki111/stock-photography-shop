import Stripe from 'stripe';
import { STRIPE_SECRET_ACCESS_KEY } from '../util/secrets';

const stripe = new Stripe(STRIPE_SECRET_ACCESS_KEY, {
  apiVersion: '2020-08-27'
});

export default stripe;
