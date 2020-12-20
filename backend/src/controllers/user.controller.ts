import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import logger from '../util/logger';
import User from '../models/user';
import Photo from '../models/photo';

// eslint-disable-next-line import/prefer-default-export
export const findAllPhotosByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const userId: any = req.params.userId;
    let foundUser = null;
    let ids = {};

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error('Incorrect user Id');
    }
    if (userId) {
      foundUser = await User.findById(userId);
      if (foundUser) {
        ids = { _id: { $in: foundUser.photos } };
      }
    }
    const foundPhotos = await Photo.find({
      ...ids
    });

    return res.status(200).send(foundPhotos);
  } catch (err) {
    return res.status(404).send({ error: { message: err.message } });
  }
};
