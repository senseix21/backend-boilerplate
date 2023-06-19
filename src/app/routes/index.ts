import express from 'express';
import { UserRoutes } from '../modules/users/user.routes';
import { CowRoutes } from '../modules/cows/cow.routes';
import { OrderRoutes } from '../modules/orders/order.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/cows',
        route: CowRoutes,
    },
    {
        path: '/orders',
        route: OrderRoutes,
    }
];

//configure the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;