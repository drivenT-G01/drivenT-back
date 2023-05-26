import schedulesRepository from '@/repositories/schedules.repository';
import { notFoundError } from '@/errors';

async function getAllSchedules() {
  const schedules = await schedulesRepository.getAllSchedules();
  if (schedules.length === 0) throw notFoundError();

  return schedules;
}

const schedulesService = {
  getAllSchedules,
};

export default schedulesService;
