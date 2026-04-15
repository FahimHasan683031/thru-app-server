import { Schema, model } from 'mongoose';
import { IReport, ReportModel } from './report.interface';

const reportSchema = new Schema<IReport, ReportModel>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        reason: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Report = model<IReport, ReportModel>('Report', reportSchema);
