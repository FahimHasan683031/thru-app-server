import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BlockService } from './block.service';
import { JwtPayload } from 'jsonwebtoken';

const blockUser = catchAsync(async (req: Request, res: Response) => {
    const blockerId = (req.user as JwtPayload).authId;
    const { blocked } = req.body;

    const result = await BlockService.blockUser(blockerId, blocked);

    sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'User blocked successfully',
        data: result,
    });
});

const unblockUser = catchAsync(async (req: Request, res: Response) => {
    const blockerId = (req.user as JwtPayload).authId;
    const blockedId = req.params.id;

    await BlockService.unblockUser(blockerId, blockedId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User unblocked successfully',
        data: null, // As standard DELETE operation output
    });
});

const getBlockedUsers = catchAsync(async (req: Request, res: Response) => {
    const blockerId = (req.user as JwtPayload).authId;
    const result = await BlockService.getBlockedUsers(blockerId, req.query);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Blocked users retrieved successfully',
        meta: result.meta,
        data: result.data,
    });
});

export const BlockController = {
    blockUser,
    unblockUser,
    getBlockedUsers,
};
