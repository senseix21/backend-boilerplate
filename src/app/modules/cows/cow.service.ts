import ApiError from "../../../errors/ApiError";
import httpStatus from 'http-status'
import { ICow, ICowFilters } from "./cow.interface";
import { Cow } from "./cow.model";
import { cowKeys, cowSearchableFields, excludeFields } from "./cow.constants";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { paginationHelpers } from "../../../errors/helpers/paginationHelpers";
import { SortOrder } from "mongoose";

//Create a Cow
const createCow = async (cowData: ICow): Promise<ICow> => {
    const createdCow = await Cow.create(cowData);
    await createdCow.populate('seller');
    return createdCow;
}

//get all Cows
const getAllCows = async (
    filters: ICowFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: cowSearchableFields.map(field => ({
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

    const result = await Cow.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Cow.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

//get a single Cows
const getCowById = async (id: string): Promise<ICow | null> => {
    const result = await Cow.findById(id);
    if (result) {
        return result;
    }
    else {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cow not found");
    }
};



// update a single Cow
const updateCowById = async (id: string, payload: Partial<ICow>): Promise<ICow | null> => {
    const isExists = await Cow.findById(id);

    if (!isExists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cow not found");
    };

    const { ...data } = payload;
    const updatedData: Partial<ICow> = { ...data }
    const updatedCowKeys = (Object.keys(updatedData));

    //Validate keys 
    for (const key of updatedCowKeys) {
        if (!cowKeys.includes(key)) {
            throw new Error(`Invalid Field `)
        }
    }

    // Check for exclude fields
    for (const field of excludeFields) {
        if (updatedCowKeys.includes(field)) {
            throw new Error(`Cannot update this field: ${field}`);
        }
    }

    const updatedCow = await Cow.findByIdAndUpdate(id, payload, { new: true });

    return updatedCow;
};


//delete a single Cows
const deleteCowById = async (id: string): Promise<ICow | null> => {
    const isExists = await Cow.findById(id);
    if (!isExists) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Cow not found");
    };

    const result = await Cow.findByIdAndDelete(id, { new: true });
    return result;
};


export const CowService = {
    createCow,
    getAllCows,
    getCowById,
    updateCowById,
    deleteCowById

}