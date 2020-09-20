import { Router } from 'express';

import * as PhotoController from '../controllers/photo.controller';
import jwtAuth from '../middlewares/auth';
import upload from '../middlewares/multer';

const router = Router();

router.get('/photos', jwtAuth, PhotoController.findAll);
router.get('/photos/:id', PhotoController.findOne);
// router.post('/photos', upload, jwtAuth, PhotoController.createOne); // ???
// router.post('/photos', jwtAuth, upload, PhotoController.createOne);
router.post('/photos', upload, PhotoController.createOne);
router.patch('/photos/:id', jwtAuth, PhotoController.updateOne);
router.delete('/photos/:id', jwtAuth, PhotoController.deleteOne);

export default router;