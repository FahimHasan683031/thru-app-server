import express from 'express';
import { BlockController } from './block.controller';
import validateRequest from '../../middleware/validateRequest';
import { BlockValidation } from './block.validation';
import auth from '../../middleware/auth';
import { USER_ROLES } from '../../../enum/user';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLES.USER, USER_ROLES.ADMIN),
    validateRequest(BlockValidation.blockUserZodSchema),
    BlockController.blockUser
);

router.delete(
    '/unblock/:id',
    auth(USER_ROLES.USER, USER_ROLES.ADMIN),
    BlockController.unblockUser
);

router.get(
    '/',
    auth(USER_ROLES.USER, USER_ROLES.ADMIN),
    BlockController.getBlockedUsers
);

export const BlockRoutes = router;
