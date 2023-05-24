import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import schedulesService from '@/services/schedule-service';

export async function getAllSchedules(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const scheduleDate = await schedulesService.getAllActivities();
    return res.status(httpStatus.OK).send(scheduleDate);
  } catch (error) {
    next(error);
  }
}
