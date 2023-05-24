/* eslint-disable import/no-unresolved */
import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import activitiesService from '@/services/activity-service';

export async function getAllActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const activities = await activitiesService.getAllActivities();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}

export async function getActivities(req: AuthenticatedRequest, res: Response) {
  const id = Number(req.params.scheduleId);
  try {
    const activities = await activitiesService.getByScheduleId(id);
    return res.send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
