/* eslint-disable import/no-unresolved */
import dayjs from 'dayjs';
import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activity-repository';

async function getAllActivities() {
  const activities = await activitiesRepository.getAllActivities();
  if (!activities) {
    throw notFoundError();
  }
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

const getByScheduleId = async (scheduleId: number): Promise<FormatedActivity[]> => {
  const activities = await activitiesRepository.findManyByScheduleId(scheduleId);

  return activities.map(({ id, name, startsAt, endsAt, capacity, ActivityBooking, local }) => {
    return {
      id,
      name,
      startsAt: dayjs(startsAt).format('HH:mm'),
      endsAt: dayjs(endsAt).format('HH:mm'),
      slots: capacity - ActivityBooking.length,
      local,
    };
  });
};

const activitiesService = { getByScheduleId, getAllActivities };

export default activitiesService;
