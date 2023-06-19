"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = require("zod");
const cow_constants_1 = require("./cow.constants");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        age: zod_1.z.number({
            required_error: 'Age is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        location: zod_1.z.enum(cow_constants_1.LOCATION_OPTIONS, {
            required_error: 'Location is required',
        }),
        breed: zod_1.z.enum(cow_constants_1.BREED_OPTIONS, {
            required_error: 'Breed is required',
        }),
        weight: zod_1.z.number({
            required_error: 'Weight is required',
        }),
        label: zod_1.z.enum(cow_constants_1.LABEL_OPTIONS, {
            required_error: 'Label is required'
        }),
        category: zod_1.z.enum(cow_constants_1.CATEGORY_OPTIONS, {
            required_error: 'Category is required'
        }),
        seller: zod_1.z.string({
            required_error: 'Seller ID is required',
        }),
    })
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum(cow_constants_1.LOCATION_OPTIONS).optional(),
        breed: zod_1.z.enum(cow_constants_1.BREED_OPTIONS).optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.enum(cow_constants_1.LABEL_OPTIONS).optional(),
        category: zod_1.z.enum(cow_constants_1.CATEGORY_OPTIONS).optional(),
        seller: zod_1.z.string().optional(),
    })
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema
};
