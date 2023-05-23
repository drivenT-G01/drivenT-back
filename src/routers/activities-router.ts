import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivities } from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/:scheduleId', getActivities);

export { activitiesRouter };
