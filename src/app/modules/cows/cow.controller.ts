import { RequestHandler } from "express";
import catchAsync from "../../../shared/catchAsync";
import { logger } from "../../../shared/logger";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from 'http-status'
import { CowService } from "./cow.service";
import { paginationFields } from "../../../constants/pagination";
import { cowSearchableFields } from "./cow.constants";
import pick from "../../../shared/pick";

//create a new Cow
const createCow: RequestHandler = catchAsync(async (req, res, next) => {
    const cowData = req.body;
    console.log(cowData);
    const result = await CowService.createCow(cowData);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Cow created successfully',
        data: result
    });

    next();
});

// //get all Cows
const getAllCows: RequestHandler = catchAsync(async (req, res, next) => {
    const filters = pick(req.query, cowSearchableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await CowService.getAllCows(filters, paginationOptions);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Cows retrieved successfully!',
        data: result
    });
    next();
});

// //get a single Cow by id
const getCowById: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const result = await CowService.getCowById(id);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Cow retrieved successfully!',
        data: result
    });
    next();
});

// //update a Cow by id
const updateCowByID: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const upatedData = req.body;
    const result = await CowService.updateCowById(id, upatedData);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Cow updated successfully!',
        data: result
    });
    next();
});

// //delete a Cow by id
const deleteCowByID: RequestHandler = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const result = await CowService.deleteCowById(id);

    sendResponse(
        res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Cow deleted successfully!',
        data: result
    });
    next();
});


export const CowController = {
    createCow,
    getAllCows,
    getCowById,
    updateCowByID,
    deleteCowByID
};