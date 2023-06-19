"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationHelpers = void 0;
const calculatePagination = (options) => {
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
exports.paginationHelpers = {
    calculatePagination,
};
