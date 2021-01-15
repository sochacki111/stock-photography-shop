import { Router } from 'express';

import * as PhotoController from '../controllers/photo.controller';

const router = Router();

router.get('/users/:userId/photos', PhotoController.findAllPhotosByUserId);

export default router;
