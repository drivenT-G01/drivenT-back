import { prisma } from '@/config';

async function findManyByScheduleId(scheduleId: number) {
  return prisma.activity.findMany({
    where: {
      scheduleId,
    },
  });
}

const activitiesRepository = {
  findManyByScheduleId,
};

export default activitiesRepository;
