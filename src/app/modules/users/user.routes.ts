import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import authenticate from '../../middlewares/authenticate';


const router = express.Router();


router.get('/', authenticate('admin'), UserController.getAllUsers);

router.get('/:id', authenticate('admin'), UserController.getUserById);

router.patch(
    '/:id', authenticate('admin'),
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUserByID);

router.delete('/:id', authenticate('admin'), UserController.deleteUserByID);

export const UserRoutes = router;
