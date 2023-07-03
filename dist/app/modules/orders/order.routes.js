"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const authenticate_1 = __importDefault(require("../../middlewares/authenticate"));
const user_1 = require("../../../enums/user");
const router = express_1.default.Router();
router.post('/create-order', (0, authenticate_1.default)(user_1.ENUM_USER_ROLE.BUYER), order_controller_1.OrderController.createOrder);
router.get('/', (0, authenticate_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER, user_1.ENUM_USER_ROLE.ADMIN), order_controller_1.OrderController.getAllOrders);
router.get('/:id', (0, authenticate_1.default)(user_1.ENUM_USER_ROLE.BUYER, user_1.ENUM_USER_ROLE.SELLER, user_1.ENUM_USER_ROLE.ADMIN), order_controller_1.OrderController.getAllOrders);
exports.OrderRoutes = router;
