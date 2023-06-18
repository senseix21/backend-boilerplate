import { z } from "zod";

const createUserZodSchema = z.object({
    body: z.object({
        phoneNumber: z.string(),
        role: z.enum(["seller", "buyer"]),
        password: z.string(),
        name: z.object({
            firstName: z.string(),
            lastName: z.string(),
        }),
        address: z.string(),
        budget: z.number(),
        income: z.number(),
    })
});

export const UserValidation = {
    createUserZodSchema,
};
