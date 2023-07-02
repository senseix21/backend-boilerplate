import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { AdminService } from "./admin.service";
import { ILoginAdminResponse } from "./admin.interface";
import config from "../../../config";

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
    loginAdmin
}
