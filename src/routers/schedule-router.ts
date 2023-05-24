/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllSchedules } from '@/controllers';

const scheduleRouter = Router();

scheduleRouter.all('/*', authenticateToken);
scheduleRouter.get('/', getAllSchedules);

export { scheduleRouter };
