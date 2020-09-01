import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

export default (req: Request, res: Response, next: NextFunction) => {
  return passport.authenticate('jwt', { session: false })(req, res, next);
};
