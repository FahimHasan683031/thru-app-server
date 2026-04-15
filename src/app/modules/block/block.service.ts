import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { Block } from './block.model';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';

const blockUser = async (blockerId: string, blockedId: string) => {
    if (blockerId === blockedId) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'You cannot block yourself');
    }

    const isUserExist = await User.findById(blockedId);
    if (!isUserExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'User not found');
    }

    const isAlreadyBlocked = await Block.findOne({ blocker: blockerId, blocked: blockedId });
    if (isAlreadyBlocked) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'User is already blocked');
    }

    const result = await Block.create({ blocker: blockerId, blocked: blockedId });
    return result;
};

const unblockUser = async (blockerId: string, blockedId: string) => {
    const blockRecord = await Block.findOneAndDelete({ blocker: blockerId, blocked: blockedId });
    if (!blockRecord) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Block record not found');
    }

    return null; // Return null on delete per best practices
};

const getBlockedUsers = async (blockerId: string, query: Record<string, unknown>) => {
    const baseQuery = Block.find({ blocker: blockerId }).populate('blocked', 'name email profileImage');
    const blockedQuery = new QueryBuilder(baseQuery, query)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await blockedQuery.modelQuery;
    const meta = await blockedQuery.getPaginationInfo();

    return {
        meta,
        data: result,
    };
};

export const BlockService = {
    blockUser,
    unblockUser,
    getBlockedUsers
};
