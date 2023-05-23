import activitiesRepository from '@/repositories/activities-repository';

const getByScheduleId = async (scheduleId: number) => {
  return activitiesRepository.findManyByScheduleId(scheduleId);
};

const activitiesService = { getByScheduleId };

export default activitiesService;
