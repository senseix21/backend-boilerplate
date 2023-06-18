import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
// import { validateRequest } from '../../middlewares/validateRequest';
// import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
    '/create-user',
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
);

// router.get('/users', UserController.getAllUsers);
// router.get('/users/:id', UserController.getUserById);
// router.put(
//     '/users/:id',
//     // validateRequest(UserValidation.updateUserZodSchema),
//     UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUserById);

export const UserRoutes = router;
