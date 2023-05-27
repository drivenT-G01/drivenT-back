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
    include: {
      ActivityBooking: true,
    },
  });
}
async function getActivityById(activitiesId: number) {
  return prisma.activity.findFirst({ 
    where: { 
      id: activitiesId 
    }, 
  });
}
async function scheduleActivity(activityId: number, userId: number) {
  return prisma.activityBooking.create({
    data: {
      userId,
      activityId
    }
  })
}
async function findManyByActivityId(activityId: number) {
  return prisma.activityBooking.findMany({
    where: {
      activityId: activityId
    }
  })
}

const activitiesRepository = {
  getAllActivities,
  findManyByScheduleId,
  getActivityById,
  scheduleActivity,
  findManyByActivityId,
};

export default activitiesRepository;
