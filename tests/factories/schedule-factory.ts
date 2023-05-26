import { Schedule } from '@prisma/client';
import { prisma } from '@/config';

export async function createSchedule() {
  return prisma.schedule.create({
    data: {
      id: 1,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
}

export function getSchedulesMock() {
  const schedule: Schedule[] = [
    {
      id: 1,
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return schedule;
}
