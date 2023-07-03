import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import validateRequest from '../../middlewares/validateRequest';
import authenticate from '../../middlewares/authenticate';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/create-admin', validateRequest(AdminValidation.createAdminZodSchema), AdminController.createAdmin)
router.post('/login', AdminController.loginAdmin)

router.get('/my-profile', authenticate(ENUM_USER_ROLE.ADMIN), AdminController.getMyProfile);

router.patch('/my-profile', authenticate(ENUM_USER_ROLE.ADMIN), AdminController.updateMyProfile);

export const AdminRoutes = router;