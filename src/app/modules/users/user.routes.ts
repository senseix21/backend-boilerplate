import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import authenticate from '../../middlewares/authenticate';
import { ENUM_USER_ROLE } from '../../../enums/user';


const router = express.Router();

router.get('/my-profile',
    authenticate(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
    UserController.getMyProfile);

router.get('/', authenticate(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

router.get('/:id', authenticate(ENUM_USER_ROLE.ADMIN), UserController.getUserById);



router.patch('/my-profile',
    authenticate(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
    UserController.updateMyProfile);


router.patch(
    '/:id', authenticate(ENUM_USER_ROLE.ADMIN),
    validateRequest(UserValidation.updateUserZodSchema),
    UserController.updateUserByID);

router.delete('/:id', authenticate(ENUM_USER_ROLE.ADMIN), UserController.deleteUserByID);

export const UserRoutes = router;
