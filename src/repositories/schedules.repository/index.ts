import { prisma } from '@/config';

async function getAllSchedules() {
  return prisma.schedule.findMany();
}

const schedulesRepository = {
  getAllSchedules,
};

export default schedulesRepository;
