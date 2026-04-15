import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { ReportService } from './report.service';
import { JwtPayload } from 'jsonwebtoken';

const createReport = catchAsync(async (req: Request, res: Response) => {
    const userId = (req.user as JwtPayload).authId;
    const result = await ReportService.createReport(userId, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Post reported successfully',
        data: result,
    });
});

const getAllReports = catchAsync(async (req: Request, res: Response) => {
    const result = await ReportService.getAllReports(req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Reports retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

export const ReportController = {
    createReport,
    getAllReports,
};
