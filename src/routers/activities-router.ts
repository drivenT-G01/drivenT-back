/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getAllActivities } from '@/controllers/activity-controller';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/', getAllActivities);

export { activitiesRouter };
