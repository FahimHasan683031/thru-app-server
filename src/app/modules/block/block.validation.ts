import { z } from 'zod';

const blockUserZodSchema = z.object({
    body: z.object({
        blocked: z.string({
            required_error: 'Blocked User ID is required',
        }),
    }),
});

export const BlockValidation = {
    blockUserZodSchema,
};
