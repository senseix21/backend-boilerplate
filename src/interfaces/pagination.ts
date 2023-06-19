export type IPaginationOptions = {
    page?: number;
    limit?: number;
    minPrice?: number;
    maxPrice?: number;
    location?: 'Dhaka' | 'Chattogram' | 'Barishal' | 'Rajshahi' | 'Sylhet' | 'Comilla' | 'Rangpur' | 'Mymensingh';
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};
