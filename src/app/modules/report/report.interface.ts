import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';
import { IPost } from '../post/post.interface';

export interface IReport {
    _id: Types.ObjectId;
    user: Types.ObjectId | IUser;
    post: Types.ObjectId | IPost;
    reason: string;
    createdAt: Date;
    updatedAt: Date;
}

export type ReportModel = Model<IReport, Record<string, unknown>>;
