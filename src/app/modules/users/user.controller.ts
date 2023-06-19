import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import { logger } from "../../../shared/logger";
import { pick } from "lodash";
import { paginationFields } from "../../../constants/pagination";
import { userSearchableFields } from "./user.constants";




//create a new user
const createUser: RequestHandler = catchAsync(async (req, res, next) => {
    const user = req.body;
    console.log(user);
    const result = await UserService.createUser(user);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User created successfully',
        data: result
    });

    next();
});

//get all users
const getAllUsers: RequestHandler = catchAsync(async (req, res, next) => {
    const filters = pick(req.query, userSearchableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await UserService.getAllUsers(filters, paginationOptions);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Users retrieved successfully!',
        data: result
    });
    next();
});

//get a single user by id
const getUserById: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const result = await UserService.getUserById(id);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User retrieved successfully!',
        data: result
    });
    next();
});

//update a user by id
const updateUserByID: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const upatedData = req.body;
    const result = await UserService.updateUserById(id, upatedData);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User updated successfully!',
        data: result
    });
    next();
});
//update a user by id
const deleteUserByID: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const result = await UserService.deleteUserById(id);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'User deleted successfully!',
        data: result
    });
    next();
});


export const UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserByID,
    deleteUserByID
};