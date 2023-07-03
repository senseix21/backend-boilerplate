"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const user_service_1 = require("./user.service");
const lodash_1 = require("lodash");
const pagination_1 = require("../../../constants/pagination");
const user_constants_1 = require("./user.constants");
const jwthelpers_1 = require("../../../helpers/jwthelpers");
const config_1 = __importDefault(require("../../../config"));
//create a new user
const createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield user_service_1.UserService.createUser(user);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User created successfully',
        data: result
    });
    next();
}));
//get all users
const getAllUsers = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, lodash_1.pick)(req.query, user_constants_1.userSearchableFields);
    const paginationOptions = (0, lodash_1.pick)(req.query, pagination_1.paginationFields);
    const result = yield user_service_1.UserService.getAllUsers(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Users retrieved successfully!',
        data: result
    });
    next();
}));
//get my profile
const getMyProfile = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers.authorization;
    const decodedToken = jwthelpers_1.jwtHelpers.verifyToken(accessToken, config_1.default.jwt.secret);
    const userId = decodedToken.userId;
    const result = yield user_service_1.UserService.getMyProfile(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Got my profile successfully!',
        data: result
    });
    next();
}));
//update my profile
const updateMyProfile = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.headers.authorization;
    const decodedToken = jwthelpers_1.jwtHelpers.verifyToken(accessToken, config_1.default.jwt.secret);
    const userId = decodedToken.userId;
    const upatedData = req.body;
    const result = yield user_service_1.UserService.updateMyProfile(userId, upatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'UPdated my profile successfully!',
        data: result
    });
    next();
}));
//get a single user by id
const getUserById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.getUserById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User retrieved successfully!',
        data: result
    });
    next();
}));
//update a user by id
const updateUserByID = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const upatedData = req.body;
    const result = yield user_service_1.UserService.updateUserById(id, upatedData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User updated successfully!',
        data: result
    });
    next();
}));
//delete a user by id
const deleteUserByID = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.deleteUserById(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User deleted successfully!',
        data: result
    });
    next();
}));
exports.UserController = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserByID,
    deleteUserByID,
    getMyProfile,
    updateMyProfile
};
