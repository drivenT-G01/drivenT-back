import schedulesRepository from '@/repositories/schedules.repository';
import { notFoundError } from '@/errors';

async function getAllActivities() {
  const activities = await schedulesRepository.getAllSchedules();
  if (!activities) {
    throw notFoundError();
  }
  return activities;
}

const schedulesService = {
  getAllActivities,
};

export default schedulesService;
