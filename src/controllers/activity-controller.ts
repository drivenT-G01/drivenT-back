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

export async function getActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const id = Number(req.params.scheduleId);
  const { userId } = req;

  try {
    const activities = await activitiesService.getByScheduleId(id, userId);
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    next(error);
  }
}

export async function scheduleActivity(req: AuthenticatedRequest, res: Response) {
  const id = Number(req.params.activitieId);
  const { userId } = req;

  try {
    await activitiesService.scheludeActivity(id, userId);
    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    if (err.name === 'NotFoundError') {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
