import { Router } from 'express';

import * as PhotoController from '../controllers/photo.controller';
import { jwtAuth, jwtAuthAnon } from '../middlewares/auth';
import upload from '../middlewares/multer';

const router = Router();

router.get('/photos', jwtAuthAnon, PhotoController.findAll);
router.get('/photos/:id', jwtAuthAnon, PhotoController.findOne);
router.post('/photos', jwtAuth, upload, PhotoController.createOne);
router.patch('/photos/:id', jwtAuth, PhotoController.updateOne);
router.delete('/photos/:id', jwtAuth, PhotoController.deleteOne);
router.post(
  '/photos/create-session',
  PhotoController.createStripeCheckoutSession
);

export default router;
