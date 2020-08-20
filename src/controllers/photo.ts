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

    res.status(200).send(foundPhotos);
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

    res.status(200).send(foundPhoto);
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

    res.status(200).send(updatedPhoto);
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

    res.status(200).send(deletedPhoto);
  } catch (err) {
    res.send(err);
  }
};
