import { Router } from 'express';
import passport from 'passport';

import * as PhotoController from '../controllers/photo.controller';
import jwtAuth from '../middlewares/auth';

const router = Router();

router.get('/photos', jwtAuth, PhotoController.findAll);
router.get('/photos/:id', PhotoController.findOne);
router.post('/photos', jwtAuth, PhotoController.createOne);
router.patch('/photos/:id', jwtAuth, PhotoController.updateOne);
router.delete('/photos/:id', jwtAuth, PhotoController.deleteOne);

export default router;
