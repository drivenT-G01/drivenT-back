import { prisma } from '@/config';

async function getAllActivities() {
  return prisma.activity.findMany({
    include: { ActivityBooking: true, schedule: true },
  });
}

async function findManyByScheduleId(scheduleId: number) {
  return prisma.activity.findMany({
    where: {
      scheduleId,
    },
  });
}

const activitiesRepository = {
  getAllActivities,
  findManyByScheduleId,
};

export default activitiesRepository;
