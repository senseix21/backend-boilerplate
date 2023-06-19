import { z } from "zod";
import { userType } from './user.constants'

const createUserZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string({
            required_error: 'phoneNumber is required',
        }),
        role: z.enum([...userType] as [string]).refine(value => value !== '', {
            message: 'role is required',
            path: ['role'],
        }),
        password: z.string({
            required_error: 'password is required',
        }),
        name: z.object({
            firstName: z.string({
                required_error: 'firstName is required',
            }),
            lastName: z.string({
                required_error: 'lastName is required',
            }),
        }),
        address: z.string({
            required_error: 'address is required',
        }),
        budget: z.number({
            required_error: 'budget is required',
        }),
        income: z.number({
            required_error: 'income is required',
        }),
    }),
});


const updateUserZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string({
            required_error: 'phoneNumber is required',
        }).optional(),
        role: z.enum([...userType] as [string]).refine(value => value !== '', {
            message: 'role is required',
            path: ['role'],
        }).optional(),
        password: z.string({
            required_error: 'password is required',
        }).optional(),
        name: z.object({
            firstName: z.string({
                required_error: 'firstName is required',
            }).optional(),
            lastName: z.string({
                required_error: 'lastName is required',
            }).optional(),
        }).optional(),
        address: z.string({
            required_error: 'address is required',
        }).optional(),
        budget: z.number({
            required_error: 'budget is required',
        }).optional(),
        income: z.number({
            required_error: 'income is required',
        }).optional(),
    }),
}).refine((value) => {
    const { phoneNumber, role, password, name, address, budget, income } = value.body;
    if (
        !phoneNumber &&
        !role &&
        !password &&
        !(name && (name.firstName || name.lastName)) &&
        !address &&
        !budget &&
        !income
    ) {
        throw new Error('At least one field must be provided for user update');
    }
    return true;
}, { message: 'At least one field must be provided for user update' });


export const UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};


