import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export interface IBlock {
    _id: Types.ObjectId;
    blocker: Types.ObjectId | IUser;
    blocked: Types.ObjectId | IUser;
    createdAt: Date;
    updatedAt: Date;
}

export type BlockModel = Model<IBlock, Record<string, unknown>>;
