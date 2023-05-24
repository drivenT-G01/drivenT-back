import dayjs from 'dayjs';
import activitiesRepository from '@/repositories/activities-repository';

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

  return activities.map(({ id, name, startsAt, endsAt, capacity, local, ActivityBooking }) => {
    return {
      id,
      name,
      startsAt: dayjs(startsAt.toISOString().slice(0, 22)).format('HH:mm'),
      endsAt: dayjs(endsAt.toISOString().slice(0, 22)).format('HH:mm'),
      slots: capacity - ActivityBooking.length,
      local,
    };
  });
};

const activitiesService = { getByScheduleId };

export default activitiesService;
