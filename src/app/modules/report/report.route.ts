import express from 'express';
import { ReportController } from './report.controller';
import validateRequest from '../../middleware/validateRequest';
import { ReportValidation } from './report.validation';
import auth from '../../middleware/auth';
import { USER_ROLES } from '../../../enum/user';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLES.USER),
    validateRequest(ReportValidation.createReportZodSchema),
    ReportController.createReport
);

router.get(
    '/',
    auth(USER_ROLES.ADMIN,),
    ReportController.getAllReports
);

export const ReportRoutes = router;
