/* eslint-disable import/no-unresolved */
import dayjs from 'dayjs';
import { notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activity-repository';
import { tooManyInActivityError } from '@/errors/too-many-in-activity-erro';

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
  isSubscribed: boolean;
};

async function getByScheduleId(scheduleId: number, userId: number): Promise<FormatedActivity[]> {
  if (!scheduleId) throw notFoundError();

  const activities = await activitiesRepository.findManyByScheduleId(scheduleId);
  if (activities.length === 0) throw notFoundError();

  return activities.map(({ id, name, startsAt, endsAt, capacity, ActivityBooking, local }) => {
    return {
      id,
      name,
      startsAt: dayjs(startsAt.toISOString().substring(0, 22)).format('HH:mm'),
      endsAt: dayjs(endsAt.toISOString().substring(0, 22)).format('HH:mm'),
      slots: capacity - ActivityBooking.length,
      local,
      isSubscribed: ActivityBooking.some((booking) => booking.userId === userId),
    };
  });
}

const scheludeActivity = async (activityId: number, userId: number) => {
  const activity = await activitiesRepository.getActivityById(activityId);
  if (!activity) throw notFoundError();

  const schedulesActivity = await activitiesRepository.findManyByActivityId(activityId);

  if (activity.capacity === schedulesActivity.length) throw tooManyInActivityError();

  await activitiesRepository.scheduleActivity(activityId, userId);

  return activity.id;
};

const activitiesService = { getByScheduleId, getAllActivities, scheludeActivity };

export default activitiesService;
