import { Request, Response, NextFunction } from 'express';
import Photo from '../models/photo';
import logger from '../util/logger';

export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundPhotos = await Photo.find({});
    logger.debug(`Found photos: ${foundPhotos}`);

    res.send(foundPhotos);
  } catch (err) {
    res.send(err);
  }
};

export const findOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const foundPhoto = await Photo.findById(req.params.id);
    logger.debug(`Found photos: ${foundPhoto}`);

    res.send(foundPhoto);
  } catch (err) {
    res.send(err);
  }
};

export const createOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const createdPhoto = await Photo.create(req.body);
    logger.debug(`Created photo: ${createdPhoto}`);

    res.status(201).send(createdPhoto);
  } catch (err) {
    res.send(err);
  }
};

export const updateOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const updatedPhoto = await Photo.findByIdAndUpdate(req.params.id, req.body);
    logger.debug(`Updated photo: ${updatedPhoto}`);

    res.send(updatedPhoto);
  } catch (err) {
    res.send(err);
  }
};

export const deleteOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedPhoto = await Photo.deleteOne({ _id: req.params.id });
    logger.debug(`Deleted photo: ${deletedPhoto}`);

    res.send(deletedPhoto);
  } catch (err) {
    res.send(err);
  }
};
