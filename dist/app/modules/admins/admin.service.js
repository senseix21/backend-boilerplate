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
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const config_1 = __importDefault(require("../../../config"));
const admin_model_1 = require("./admin.model");
const jwthelpers_1 = require("../../../helpers/jwthelpers");
//Create a Admin
const createAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.create(admin);
    return result;
});
//get My Profile
const getMyProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findById(id, { name: 1, phoneNumber: 1, address: 1 });
    return result;
});
//Update My Profile
const updateMyProfile = (id, upatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admin_model_1.Admin.findByIdAndUpdate(id, upatedData, { new: true, name: 1, phoneNumber: 1, address: 1 });
    return result;
});
//LOgin Admin
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    // console.log(phoneNumber, password);
    const isAdminExist = yield admin_model_1.Admin.isAdminExist(phoneNumber);
    // console.log(isAdminExist);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin does not exist');
    }
    if (isAdminExist.password &&
        !(yield admin_model_1.Admin.isPasswordMatched(password, isAdminExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token & refresh token
    const { id: userId, role } = isAdminExist;
    const accessToken = jwthelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwthelpers_1.jwtHelpers.createToken({ userId, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.AdminService = {
    createAdmin,
    loginAdmin,
    getMyProfile,
    updateMyProfile
};
