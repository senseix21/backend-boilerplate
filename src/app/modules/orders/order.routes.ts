import express from 'express';
import { OrderController } from './order.controller';
import authenticate from '../../middlewares/authenticate';
import { ENUM_USER_ROLE } from '../../../enums/user';
const router = express.Router();

router.post('/create-order', authenticate(ENUM_USER_ROLE.BUYER), OrderController.createOrder);

router.get('/', authenticate(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN), OrderController.getAllOrders);
router.get('/:id', authenticate(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN), OrderController.getAllOrders);



export const OrderRoutes = router;
