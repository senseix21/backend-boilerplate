import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
// import { validateRequest } from '../../middlewares/validateRequest';
// import { UserValidation } from './user.validation';

const router = express.Router();


router.get('/', UserController.getAllUsers);

router.get('/:id', UserController.getUserById);

router.patch(
    '/:id',
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUserByID);

router.delete('/:id', UserController.deleteUserByID);

export const UserRoutes = router;
