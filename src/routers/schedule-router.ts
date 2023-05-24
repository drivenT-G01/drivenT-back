/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllSchedules } from '@/controllers/schedule-controller';

const scheduleRouter = Router();

scheduleRouter.all('/*', authenticateToken);
scheduleRouter.get('/', getAllSchedules);

export { scheduleRouter };
