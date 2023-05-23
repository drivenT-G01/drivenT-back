import { NextFunction, Response } from 'express';
// eslint-disable-next-line import/no-unresolved
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import activityService from '@/services/activity-service';

export async function getAllActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const activities = await activityService.getAllActivities();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}
