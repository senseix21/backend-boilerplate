import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { UserService } from "./user.service";
import { pick } from "lodash";
import { paginationFields } from "../../../constants/pagination";
import { userSearchableFields } from "./user.constants";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";




//create a new user
const createUser: RequestHandler = catchAsync(async (req, res, next) => {
    const user = req.body;
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


//get my profile
const getMyProfile: RequestHandler = catchAsync(async (req, res, next) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;
    const result = await UserService.getMyProfile(userId);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Got my profile successfully!',
        data: result
    });
    next();
});

//update my profile
const updateMyProfile: RequestHandler = catchAsync(async (req, res, next) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;

    const upatedData = req.body;
    const result = await UserService.updateMyProfile(userId, upatedData);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'UPdated my profile successfully!',
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

//delete a user by id
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
    deleteUserByID,
    getMyProfile,
    updateMyProfile
};