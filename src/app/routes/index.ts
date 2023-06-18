import express from 'express';
import { UserRoutes } from '../modules/users/user.routes';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    // {
    //     path: '/cows',
    //     route: cowRoutes,
    // },
    // {
    //     path: '/orders',
    //     route: orderRoutes,
    // }
];

//configure the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;