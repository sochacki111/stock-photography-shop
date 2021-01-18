import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

import { PutObjectRequest } from 'aws-sdk/clients/s3';
import Photo from '../models/photo';
import logger from '../util/logger';
import s3 from '../config/s3.config';
import User from '../models/user';
import stripe from '../config/stripe';

declare global {
  namespace Express {
    interface User {
      _id: string;
      email: string;
    }
  }
}

// TODO Refactor const { user } = req;
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const category = req.query.category
    ? { category: String(req.query.category) }
    : {};
  const searchKeyword = req.query.searchKeyword
    ? {
        title: {
          $regex: String(req.query.searchKeyword),
          $options: 'i'
        }
      }
    : {};

  // let sortOrder;
  // if (req.query.sortOrder) {
  //   sortOrder = req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 };
  // } else {
  //   sortOrder = { _id: -1 };
  // }

  const order = {
    lowest: { price: 1 },
    highest: { price: -1 },
    newest: { _id: -1 },
    oldest: { _id: 1 }
  };

  // TODO Convert to object literal
  const getSortOrder = (sortOrder: string) => {
    switch (sortOrder) {
      case 'lowest':
        return { price: 1 };
      case 'highest':
        return { price: -1 };
      case 'newest':
        return { _id: -1 };
      case 'oldest':
        return { _id: 1 };
      default:
        return { _id: -1 };
    }
  };
  const sortOrder = getSortOrder(String(req.query.sortOrder));

  try {
    const foundPhotos = await Photo.find({
      ...category,
      ...searchKeyword
    }).sort(sortOrder);

    return res.status(200).send(foundPhotos);
  } catch (err) {
    return res.send(err);
  }
};

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
    }).sort({ _id: -1 });

    return res.status(200).send(foundPhotos);
  } catch (err) {
    return res.status(404).send({ error: { message: err.message } });
  }
};

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const user = (<any>req).user;
  console.log(user);

  try {
    const foundPhoto = await Photo.findById(req.params.id)
      .populate('owner', 'email')
      .lean()
      .exec();
    logger.debug(`Found photo: ${foundPhoto}`);
    let isAuthor = false;
    if (user) {
      isAuthor = String(foundPhoto?.owner._id) === String(user._id);
    }

    return res.status(200).send({ ...foundPhoto, isAuthor });
  } catch (err) {
    console.log(err);
    return res.send(err);
  }
};
export const createOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const user = (<any>req).user;
  try {
    // This comes from multer middleware
    const originalFileName = req.file.originalname;

    const params: PutObjectRequest = {
      Bucket: String(process.env.AWS_BUCKET_NAME),
      // Key: `${uuidv4()}.${fileType}`,
      Key: `photos/${originalFileName}`,
      Body: req.file.buffer,
      ACL: 'public-read'
    };

    const uploadedData = await s3.upload(params).promise();

    const photoToCreate = {
      title: req.body.title,
      owner: user?._id,
      category: req.body.category,
      url: uploadedData.Location,
      price: req.body.price
    };

    const createdPhoto = await Photo.create(photoToCreate);
    logger.debug(`Created photo: ${createdPhoto}`);
    await User.findByIdAndUpdate(user._id, {
      $push: { photos: createdPhoto._id }
    })
      .lean()
      .exec();
    return res.status(201).send(createdPhoto);
  } catch (err) {
    return res.send(err);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body);
    logger.debug(`Updated photo: ${updatedPhoto}`);

    return res.status(200).send(updatedPhoto);
  } catch (err) {
    return res.send(err);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const deletedPhoto = await Photo.deleteOne({ _id: req.params.id });
    logger.debug(`Deleted photo: ${deletedPhoto}`);

    return res.status(200).send(deletedPhoto);
  } catch (err) {
    return res.send(err);
  }
};

export const createStripeCheckoutSession = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { user } = req;
  const customerEmail = user ? { customer_email: user.email } : {};
  try {
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
      ...customerEmail,
      mode: 'payment',
      // success_url: `${YOUR_DOMAIN}?success=true`,
      success_url: `${process.env.DOMAIN}/photos/${req.body.photo._id}`,
      cancel_url: `${process.env.DOMAIN}/photos/${req.body.photo._id}`
    });

    return res.status(200).json({ id: session.id });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
