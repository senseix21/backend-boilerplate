"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const user_constants_1 = require("./user.constants");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'phoneNumber is required',
        }),
        role: zod_1.z.enum([...user_constants_1.userType]).refine(value => value !== '', {
            message: 'role is required',
            path: ['role'],
        }),
        password: zod_1.z.string({
            required_error: 'password is required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'firstName is required',
            }),
            lastName: zod_1.z.string({
                required_error: 'lastName is required',
            }),
        }),
        address: zod_1.z.string({
            required_error: 'address is required',
        }),
        budget: zod_1.z.number({
            required_error: 'budget is required',
        }),
        income: zod_1.z.number({
            required_error: 'income is required',
        }),
    }),
});
const updateUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({
            required_error: 'phoneNumber is required',
        }).optional(),
        role: zod_1.z.enum([...user_constants_1.userType]).refine(value => value !== '', {
            message: 'role is required',
            path: ['role'],
        }).optional(),
        password: zod_1.z.string({
            required_error: 'password is required',
        }).optional(),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'firstName is required',
            }).optional(),
            lastName: zod_1.z.string({
                required_error: 'lastName is required',
            }).optional(),
        }).optional(),
        address: zod_1.z.string({
            required_error: 'address is required',
        }).optional(),
        budget: zod_1.z.number({
            required_error: 'budget is required',
        }).optional(),
        income: zod_1.z.number({
            required_error: 'income is required',
        }).optional(),
    }),
}).refine((value) => {
    const { phoneNumber, role, password, name, address, budget, income } = value.body;
    if (!phoneNumber &&
        !role &&
        !password &&
        !(name && (name.firstName || name.lastName)) &&
        !address &&
        !budget &&
        !income) {
        throw new Error('At least one field must be provided for user update');
    }
    return true;
}, { message: 'At least one field must be provided for user update' });
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};
