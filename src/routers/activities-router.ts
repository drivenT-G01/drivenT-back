/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getAllActivities, getActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken);
activitiesRouter.get('/', getAllActivities);
activitiesRouter.get('/:scheduleId', getActivities);

export { activitiesRouter };
