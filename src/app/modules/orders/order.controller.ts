import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import { logger } from "../../../shared/logger";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status';
import { OrderService } from "./order.service";


//create a new Order
const createOrder: RequestHandler = catchAsync(async (req, res, next) => {
    const order = req.body;
    console.log(order);
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

//get all Orders
const getAllOrders: RequestHandler = catchAsync(async (req, res, next) => {


    const result = await OrderService.getAllOrders();

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
    createOrder, getAllOrders
}