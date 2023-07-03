import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AdminService } from "./admin.service";
import { ILoginAdminResponse } from "./admin.interface";
import config from "../../../config";
import { jwtHelpers } from "../../../helpers/jwthelpers";
import { Secret } from "jsonwebtoken";

//create a new admin
const createAdmin: RequestHandler = catchAsync(async (req, res, next) => {
    const admin = req.body;
    const result = await AdminService.createAdmin(admin);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Admin created successfully',
        data: result
    });

    next();
});


//get my profile
const getMyProfile: RequestHandler = catchAsync(async (req, res, next) => {
    const accessToken: any = req.headers.authorization;
    const decodedToken = jwtHelpers.verifyToken(accessToken, config.jwt.secret as Secret);
    const userId = decodedToken.userId;
    const result = await AdminService.getMyProfile(userId);

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
    const result = await AdminService.updateMyProfile(userId, upatedData);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'UPdated my profile successfully!',
        data: result
    });
    next();
});

//login a admin
const loginAdmin = catchAsync(async (req: Request, res: Response) => {
    const { ...loginData } = req.body;
    const result = await AdminService.loginAdmin(loginData);
    const { refreshToken, ...others } = result;

    // set refresh token into cookie

    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true,
    };

    res.cookie('refreshToken', refreshToken, cookieOptions);

    sendResponse<ILoginAdminResponse>(res, {
        statusCode: 200,
        success: true,
        message: 'User loggedin successfully !',
        data: others,
    });
});

export const AdminController = {
    createAdmin,
    loginAdmin,
    getMyProfile,
    updateMyProfile
}
