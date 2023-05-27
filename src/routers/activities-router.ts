/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAllActivities, getActivities, scheduleActivity } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/', getAllActivities).get('/:scheduleId', getActivities).post('/:activitieId', scheduleActivity);

export { activitiesRouter };
