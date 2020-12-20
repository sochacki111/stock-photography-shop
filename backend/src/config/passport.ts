import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Strategy as AnonStrategy } from 'passport-anonymous';
import User from '../models/user';
import config from './config';
import logger from '../util/logger';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret
};

export const JwtStrategy = new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    }

    return done(null, false);
  } catch (error) {
    logger.error(error);

    return done(error);
  }
});

export const AnonymousStrategy = new AnonStrategy();
