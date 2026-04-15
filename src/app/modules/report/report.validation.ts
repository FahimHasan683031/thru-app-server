import { z } from 'zod';

const createReportZodSchema = z.object({
    body: z.object({
        post: z.string({
            required_error: 'Post ID is required',
        }),
        reason: z.string({
            required_error: 'Report reason is required',
        }).min(1, 'Reason cannot be empty'),
    }),
});

export const ReportValidation = {
    createReportZodSchema,
};
