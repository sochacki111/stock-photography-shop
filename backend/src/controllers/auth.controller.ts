import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import config from '../config/config';

function createToken(user: IUser) {
  // TODO check if email is necessary here
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400
  });
}

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return (
      res
        .status(400)
        // TODO Refactor return message to be not redundant
        .json({ error: { message: 'Please. Send your email and password' } })
    );
  }

  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .json({ error: { message: 'The User already Exists' } });
  }

  const newUser = new User(req.body);
  await newUser.save();
  return res.status(201).json(newUser);
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ error: { message: 'Please. Send your email and password' } });
  }

  const user = await User.findOne({ email: req.body.email });
  console.log(user?.toJSON());
  if (!user) {
    return res
      .status(400)
      .json({ error: { message: 'The User does not exists' } });
  }

  const isMatch = await user.comparePassword(req.body.password);
  if (isMatch) {
    return res
      .status(200)
      .json({ idToken: createToken(user), localId: user._id });
  }

  return res.status(400).json({
    error: {
      message: 'The email or password are incorrect'
    }
  });
};
