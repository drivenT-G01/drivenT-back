import { getSchedulesMock } from '../factories/schedule-factory';
import schedulesService from '@/services/schedule-service';
import schedulesRepository from '@/repositories/schedules.repository';

describe('getAllSchedules function', () => {
  it('should get schedules', async () => {
    const schedules = getSchedulesMock();

    jest.spyOn(schedulesRepository, 'getAllSchedules').mockResolvedValue(schedules);

    const result = await schedulesService.getAllSchedules();

    expect(result).toEqual(schedules);
  });
});
