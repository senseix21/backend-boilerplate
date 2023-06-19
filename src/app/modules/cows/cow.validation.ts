import { z } from 'zod'
import { BREED_OPTIONS, CATEGORY_OPTIONS, LABEL_OPTIONS, LOCATION_OPTIONS } from './cow.constants';

const createCowZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        age: z.number({
            required_error: 'Age is required',
        }),
        price: z.number({
            required_error: 'Price is required',
        }),
        location: z.enum(LOCATION_OPTIONS, {
            required_error: 'Location is required',
        }),
        breed: z.enum(BREED_OPTIONS, {
            required_error: 'Breed is required',
        }),
        weight: z.number({
            required_error: 'Weight is required',
        }),
        label: z.enum(LABEL_OPTIONS, {
            required_error: 'Label is required'
        }),
        category: z.enum(CATEGORY_OPTIONS, {
            required_error: 'Category is required'
        }),
        seller: z.string({
            required_error: 'Seller ID is required',
        }),
    })
});


const updateCowZodSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        age: z.number().optional(),
        price: z.number().optional(),
        location: z.enum(LOCATION_OPTIONS).optional(),
        breed: z.enum(BREED_OPTIONS).optional(),
        weight: z.number().optional(),
        label: z.enum(LABEL_OPTIONS).optional(),
        category: z.enum(CATEGORY_OPTIONS).optional(),
        seller: z.string().optional(),
    })
})


export const CowValidation = {
    createCowZodSchema,
    updateCowZodSchema
}