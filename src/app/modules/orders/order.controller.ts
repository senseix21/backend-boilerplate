import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status';
import { OrderService } from "./order.service";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";


//create a new Order
const createOrder: RequestHandler = catchAsync(async (req, res, next) => {
    const order = req.body;
    const result = await OrderService.createOrder(order);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Order created successfully',
        data: result
    });

    next();
});

//Get a single Order
const getOrder: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const result = await OrderService.getOrder(id);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Order created successfully',
        data: result
    });

    next();
});


//get all Orders
const getAllOrders: RequestHandler = catchAsync(async (req, res, next) => {

    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;
    const role = decodedToken.role;

    const result = await OrderService.getAllOrders(userId, role);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Orders retrieved successfully!',
        data: result
    });
    next();
});

export const OrderController = {
    createOrder, getAllOrders, getOrder
}