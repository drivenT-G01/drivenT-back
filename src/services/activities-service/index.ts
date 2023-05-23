import dayjs from 'dayjs';
import activitiesRepository from '@/repositories/activities-repository';

type FormatedActivity = {
  id: number;
  name: string;
  startsAt: string;
  endsAt: string;
  capacity: number;
  local: string;
};

const getByScheduleId = async (scheduleId: number): Promise<FormatedActivity[]> => {
  const activities = await activitiesRepository.findManyByScheduleId(scheduleId);

  return activities.map(({ id, name, startsAt, endsAt, capacity, local }) => {
    return {
      id,
      name,
      startsAt: dayjs(startsAt).format('HH:mm'),
      endsAt: dayjs(endsAt).format('HH:mm'),
      capacity,
      local,
    };
  });
};

const activitiesService = { getByScheduleId };

export default activitiesService;
