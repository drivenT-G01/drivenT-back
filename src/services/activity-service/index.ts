import { notFoundError } from '@/errors';
import activityRepository from '@/repositories/activity-repository';

async function getAllActivities() {
  const activities = await activityRepository.getAllActivities();
  if (!activities) {
    throw notFoundError();
  }
  return activities;
}

const activityService = {
  getAllActivities,
};

export default activityService;
