import { Request, Response } from 'express';
import httpStatus from 'http-status';
import activitiesService from '@/services/activities-service';

export async function getActivities(req: Request, res: Response) {
  const id = Number(req.params.scheduleId);
  try {
    const activities = await activitiesService.getByScheduleId(id);
    return res.send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
