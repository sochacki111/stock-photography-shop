import { Router } from 'express';

import * as UserController from '../controllers/user.controller';

const router = Router();

router.get('/users/:userId/photos', UserController.findAllPhotosByUserId);

export default router;
