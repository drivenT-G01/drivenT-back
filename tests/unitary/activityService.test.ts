import dayjs from 'dayjs';
import { getActivityMock, getAllActivitiesMock } from '../factories/activity-factory';
import activitiesService from '@/services/activity-service';
import activitiesRepository from '@/repositories/activity-repository';

describe('getAllActivities function', () => {
  it('should get Activities', async () => {
    const activities = getAllActivitiesMock();

    jest.spyOn(activitiesRepository, 'getAllActivities').mockResolvedValue(activities);

    const result = await activitiesService.getAllActivities();

    expect(result).toEqual(activities);
  });
});

describe('getByScheduleId function', () => {
  it('should get Activities by scheduleId', async () => {
    const userId = 1;
    const scheduleId = 1;
    const activities = [getActivityMock()];

    jest.spyOn(activitiesRepository, 'findManyByScheduleId').mockResolvedValue(activities);

    const result = await activitiesService.getByScheduleId(scheduleId, userId);
    const formattedObject = [
      {
        id: 1,
        name: 'teste',
        local: 'AL',
        slots: 2,
        startsAt: dayjs().add(3, 'hour').format('HH:mm'),
        endsAt: dayjs().add(3, 'hour').format('HH:mm'),
        isSubscribed: false,
      },
    ];

    expect(activitiesRepository.findManyByScheduleId).toHaveBeenCalledWith(scheduleId);
    expect(result).toEqual(formattedObject);
  });
});
