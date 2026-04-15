import { Schema, model } from 'mongoose';
import { IBlock, BlockModel } from './block.interface';

const blockSchema = new Schema<IBlock, BlockModel>(
    {
        blocker: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        blocked: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate blocks
blockSchema.index({ blocker: 1, blocked: 1 }, { unique: true });

export const Block = model<IBlock, BlockModel>('Block', blockSchema);
