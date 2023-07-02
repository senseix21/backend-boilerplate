import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';
import { UserValidation } from '../users/user.validation';
import { UserController } from '../users/user.controller';

const router = express.Router();


router.post(
    '/signup',
    validateRequest(UserValidation.createUserZodSchema),
    UserController.createUser
);

router.post(
    '/login',
    validateRequest(AuthValidation.loginZodSchema),
    AuthController.loginUser
);

export const AuthRoutes = router;