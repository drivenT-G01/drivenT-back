import { Activity, Schedule, ActivityBooking } from '@prisma/client';
import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import { prisma } from '@/config';

export async function createActivity(scheduleId: number) {
  return prisma.activity.create({
    data: {
      id: 1,
      scheduleId,
      name: faker.company.companyName(),
      startsAt: new Date(),
      endsAt: new Date(),
      local: 'AL',
      capacity: faker.datatype.number({ min: 10, max: 30 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export async function createActivityWithOneCapacity(scheduleId: number) {
  return prisma.activity.create({
    data: {
      id: 1,
      scheduleId,
      name: faker.company.companyName(),
      startsAt: new Date(),
      endsAt: new Date(),
      local: 'AL',
      capacity: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export async function createActivityBooking(activityId: number, userId: number) {
  return prisma.activityBooking.create({
    data: {
      activityId,
      userId,
    },
  });
}

export function getAllActivitiesMock() {
  const activity: (Activity & { schedule: Schedule; ActivityBooking: ActivityBooking[] })[] = [
    {
      id: 1,
      scheduleId: 1,
      name: 'teste',
      startsAt: new Date(),
      endsAt: new Date(),
      local: 'AL',
      capacity: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
      schedule: {
        id: 1,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      ActivityBooking: [],
    },
  ];

  return activity;
}

export function getActivityMock(): Activity & { ActivityBooking: ActivityBooking[] } {
  return {
    id: 1,
    scheduleId: 1,
    name: 'teste',
    startsAt: new Date(),
    endsAt: new Date(),
    local: 'AL',
    capacity: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    ActivityBooking: [],
  };
}
