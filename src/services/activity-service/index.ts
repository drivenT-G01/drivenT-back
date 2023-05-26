/* eslint-disable import/no-unresolved */
import dayjs from 'dayjs';
import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activity-repository';

async function getAllActivities() {
  const activities = await activitiesRepository.getAllActivities();
  if (activities.length === 0) throw notFoundError();
  return activities;
}

type FormatedActivity = {
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
  slots: number;
  local: string;
};

async function getByScheduleId(scheduleId: number): Promise<FormatedActivity[]> {
  if (!scheduleId) throw notFoundError();

  const activities = await activitiesRepository.findManyByScheduleId(scheduleId);
  if (activities.length === 0) throw notFoundError();

  return activities.map(({ id, name, startsAt, endsAt, capacity, ActivityBooking, local }) => {
    return {
      id,
      name,
      local,
      slots: capacity - ActivityBooking.length,
      startsAt: dayjs(startsAt).format('HH:mm'),
      endsAt: dayjs(endsAt).format('HH:mm'),
    };
  });
}

const activitiesService = { getByScheduleId, getAllActivities };

export default activitiesService;
