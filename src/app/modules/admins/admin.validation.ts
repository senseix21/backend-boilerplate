import { z } from "zod";
import { adminType } from "./admin.constants";

const createAdminZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string({
            required_error: 'phoneNumber is required',
        }),
        role: z.enum([...adminType] as [string]).refine(value => value !== '', {
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
    }),
});

export const AdminValidation = {
    createAdminZodSchema
}