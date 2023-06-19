import { SortOrder } from 'mongoose';

type IOptions = {
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    location?: 'Dhaka' | 'Chattogram' | 'Barishal' | 'Rajshahi' | 'Sylhet' | 'Comilla' | 'Rangpur' | 'Mymensingh';
    sortBy?: string;
    sortOrder?: SortOrder;
};

type IOptionsResult = {
    page: number;
    limit: number;
    minPrice: number;
    maxPrice: number;
    location: string | undefined;
    skip: number;
    sortBy: string;
    sortOrder: SortOrder;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
    const page = Number(options.page || 1);
    const limit = Number(options.limit || 10);
    const minPrice = Number(options.minPrice || 20000);
    const maxPrice = Number(options.maxPrice || 70000);
    const location = options.location;
    const skip = (page - 1) * limit;
    const sortBy = options.sortBy || 'createdAt';
    const sortOrder = options.sortOrder || 'desc';

    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder,
        minPrice,
        maxPrice,
        location
    };
};

export const paginationHelpers = {
    calculatePagination,
};
