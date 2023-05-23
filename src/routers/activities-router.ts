import { Router } from 'express';
// eslint-disable-next-line import/no-unresolved
import { authenticateToken, validateBody } from '@/middlewares';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken);

export { activitiesRouter };
