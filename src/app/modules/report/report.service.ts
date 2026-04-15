import { StatusCodes } from 'http-status-codes';
import ApiError from '../../../errors/ApiError';
import { IReport } from './report.interface';
import { Report } from './report.model';
import { Post } from '../post/post.model';
import QueryBuilder from '../../builder/QueryBuilder';


const createReport = async (userId: string, payload: IReport): Promise<IReport> => {
    // Check if post exists
    const isPostExist = await Post.findById(payload.post);
    if (!isPostExist) {
        throw new ApiError(StatusCodes.NOT_FOUND, 'Post not found');
    }

    // Check if already reported by this user
    const isAlreadyReported = await Report.findOne({
        user: userId,
        post: payload.post,
    });

    if (isAlreadyReported) {
        throw new ApiError(StatusCodes.BAD_REQUEST, 'You have already reported this post');
    }

    payload.user = userId as any;

    const result = await Report.create(payload);
    return result;
};

const getAllReports = async (query: Record<string, unknown>) => {
    const reportQuery = new QueryBuilder(
        Report.find().populate('user', 'name email profileImage').populate('post'),
        query
    )
        .search(['reason'])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await reportQuery.modelQuery;
    const meta = await reportQuery.getPaginationInfo();

    return {
        meta,
        data: result,
    };
};

export const ReportService = {
    createReport,
    getAllReports,
};
