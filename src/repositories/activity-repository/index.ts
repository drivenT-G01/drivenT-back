import { prisma } from '@/config';

async function getAllActivities() {
  return prisma.activity.findMany({
    include: { ActivityBooking: true, schedule: true },
  });
}
const activityRepository = {
  getAllActivities,
};

export default activityRepository;
