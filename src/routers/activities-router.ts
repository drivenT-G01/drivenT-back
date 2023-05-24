/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllActivities, getActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/', getAllActivities).get('/:scheduleId', getActivities);

export { activitiesRouter };
