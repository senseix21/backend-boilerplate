import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CowValidation } from './cow.validation';
import { CowController } from './cow.controller';

const router = express.Router();

router.post(
    '/create-Cow',
    validateRequest(CowValidation.createCowZodSchema),
    CowController.createCow
);

router.get('/', CowController.getAllCows);

router.get('/:id', CowController.getCowById);

router.patch(
    '/:id',
    validateRequest(CowValidation.updateCowZodSchema),
    CowController.updateCowByID);

router.delete('/:id', CowController.deleteCowByID);

export const CowRoutes = router;
