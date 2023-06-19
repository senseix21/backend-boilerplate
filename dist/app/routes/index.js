"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/users/user.routes");
const cow_routes_1 = require("../modules/cows/cow.routes");
const order_routes_1 = require("../modules/orders/order.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: user_routes_1.UserRoutes
    },
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/cows',
        route: cow_routes_1.CowRoutes,
    },
    {
        path: '/orders',
        route: order_routes_1.OrderRoutes,
    }
];
//configure the routes
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
