import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import { logger } from "../../../shared/logger";



const createUser: RequestHandler = catchAsync(async (req, res, next) => {
    const user = req.body;
    logger.info(user);
    const result = await UserService.createUser(user);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User created successfully',
        data: result
    });

    next();

})

export const UserController = {
    createUser,
};