import express from 'express';
import { UserRoutes } from '../modules/users/user.routes';
import { CowRoutes } from '../modules/cows/cow.routes';

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
    // {
    //     path: '/orders',
    //     route: orderRoutes,
    // }
];

//configure the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;