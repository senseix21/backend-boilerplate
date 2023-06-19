import { SortOrder } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelpers";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { excludeFields, updateFields, userSearchableFields } from "./user.constants";
import { IUser, IUserFilters } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status'

//Create a user
const createUser = async (user: IUser): Promise<IUser> => {
    const createdUser = await User.create(user);
    return createdUser;
}

//get all users
const getAllUsers = async (
    filters: IUserFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IUser[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: userSearchableFields.map(field => ({
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


    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await User.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await User.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

//get a single users
const getUserById = async (id: string): Promise<IUser | null> => {

    const result = await User.findById(id);
    if (result) {
        return result;
    }
    else {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found");
    }
};
//update a single users
const updateUserById = async (id: string, payload: Partial<IUser>): Promise<IUser | null> => {
    const isExists = await User.findById(id);
    if (!isExists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cow not found");
    };

    const { ...data } = payload;
    const updatedData: Partial<IUser> = { ...data }
    const updatedUserKeys = (Object.keys(updatedData));

    //Validate keys 
    for (const key of updatedUserKeys) {
        if (!updateFields.includes(key)) {
            throw new Error(`Invalid Field `)
        }
    }

    // Check for exclude fields
    for (const field of excludeFields) {
        if (updatedUserKeys.includes(field)) {
            throw new Error(`Cannot update this field: ${field}`);
        }
    }
    const result = await User.findByIdAndUpdate(id, updatedData, { new: true });
    return result;
};

//delete a single users
const deleteUserById = async (id: string): Promise<IUser | null> => {
    const isExists = await User.findById(id);
    if (!isExists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cow not found");
    };
    const result = await User.findByIdAndDelete(id, { new: true });
    return result;
};


export const UserService = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById

}