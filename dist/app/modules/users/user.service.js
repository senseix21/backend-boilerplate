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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const user_constants_1 = require("./user.constants");
const user_model_1 = require("./user.model");
const http_status_1 = __importDefault(require("http-status"));
//Create a user
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield user_model_1.User.create(user);
    return createdUser;
});
//get all users
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: user_constants_1.userSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield user_model_1.User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
//get a single users
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id);
    if (result) {
        return result;
    }
    else {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "User not found");
    }
});
//update a single users
const updateUserById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield user_model_1.User.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cow not found");
    }
    ;
    const data = __rest(payload, []);
    const updatedData = Object.assign({}, data);
    const updatedUserKeys = (Object.keys(updatedData));
    //Validate keys 
    for (const key of updatedUserKeys) {
        if (!user_constants_1.updateFields.includes(key)) {
            throw new Error(`Invalid Field `);
        }
    }
    // Check for exclude fields
    for (const field of user_constants_1.excludeFields) {
        if (updatedUserKeys.includes(field)) {
            throw new Error(`Cannot update this field: ${field}`);
        }
    }
    const result = yield user_model_1.User.findByIdAndUpdate(id, updatedData, { new: true });
    return result;
});
//delete a single users
const deleteUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExists = yield user_model_1.User.findById(id);
    if (!isExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "Cow not found");
    }
    ;
    const result = yield user_model_1.User.findByIdAndDelete(id, { new: true });
    return result;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
};
