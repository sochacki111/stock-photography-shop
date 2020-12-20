import { Request, Response, NextFunction } from 'express';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import Photo from '../models/photo';
import logger from '../util/logger';
import s3 from '../config/s3.config';
import IPhoto from '../models/photo';
import User from '../models/user';

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

  let sortOrder;
  if (req.query.sortOrder) {
    sortOrder = req.query.sortOrder === 'lowest' ? { price: 1 } : { price: -1 };
  } else {
    sortOrder = { _id: -1 };
  }

  try {
    const foundPhotos = await Photo.find({
      ...category,
      ...searchKeyword
    });

    return res.status(200).send(foundPhotos);
  } catch (err) {
    return res.send(err);
  }
};

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const foundPhoto = await Photo.findById(req.params.id)
      .populate('owner', 'email')
      .exec();
    logger.debug(`Found photo: ${foundPhoto}`);
    return res.status(200).send(foundPhoto);
  } catch (err) {
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
