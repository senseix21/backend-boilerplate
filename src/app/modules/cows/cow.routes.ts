import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CowValidation } from './cow.validation';
import { CowController } from './cow.controller';
import authenticate from '../../middlewares/authenticate';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
    '/create-Cow', authenticate(ENUM_USER_ROLE.SELLER),
    validateRequest(CowValidation.createCowZodSchema),
    CowController.createCow
);

router.get('/', authenticate(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), CowController.getAllCows);

router.get('/:id', authenticate(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.ADMIN), CowController.getCowById);

router.patch(
    '/:id', authenticate(ENUM_USER_ROLE.SELLER),
    validateRequest(CowValidation.updateCowZodSchema),
    CowController.updateCowByID);

router.delete('/:id', authenticate(ENUM_USER_ROLE.SELLER), CowController.deleteCowByID);

export const CowRoutes = router;
