import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import { TicketStatus } from '@prisma/client';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import {
  createEnrollmentWithAddress,
  createUser,
  createTicket,
  createPayment,
  createTicketTypeWithHotel,
} from '../factories';
import { createSchedule } from '../factories/schedule-factory';
import { createActivity, createActivityBooking, createActivityWithOneCapacity } from '../factories/activity-factory';
import { cleanDb, generateValidToken } from '../helpers';
import app, { init } from '@/app';

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET ALL activities', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activities');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 when activities does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      await createSchedule();
      const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and a list of activities', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      const schedule = await createSchedule();
      const activity = await createActivity(schedule.id);

      const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);

      expect(response.body).toEqual([
        {
          id: activity.id,
          scheduleId: schedule.id,
          name: activity.name,
          startsAt: activity.startsAt.toISOString(),
          endsAt: activity.endsAt.toISOString(),
          local: activity.local,
          capacity: activity.capacity,
          createdAt: activity.createdAt.toISOString(),
          updatedAt: activity.updatedAt.toISOString(),
          ActivityBooking: [],
          schedule: {
            id: schedule.id,
            date: schedule.date.toISOString(),
            createdAt: schedule.createdAt.toISOString(),
            updatedAt: schedule.updatedAt.toISOString(),
          },
        },
      ]);
    });
  });
});

describe('GET an activity', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activities');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 when scheduleId does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      await createSchedule();
      const response = await server.get('/activities/').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('should respond with status 404 when activity does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      const schedule = await createSchedule();

      const response = await server.get(`/activities/${schedule.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('should respond with status 200 and an activity', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      const schedule = await createSchedule();
      const activity = await createActivity(schedule.id);

      const response = await server.get(`/activities/${schedule.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: activity.id,
          name: activity.name,
          startsAt: dayjs(activity.startsAt).add(3, 'hour').format('HH:mm'),
          endsAt: dayjs(activity.endsAt).add(3, 'hour').format('HH:mm'),
          slots: expect.any(Number),
          local: activity.local,
          isSubscribed: expect.any(Boolean),
        },
      ]);
    });
  });
});

describe('post an activity', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.post('/activities');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.post('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.post('/activities').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 404 when activity does not exist', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      await createSchedule();
      const response = await server.post('/activities/1').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });

    it('should respond with status 400 when activity does not have vacancy', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      const schedule = await createSchedule();
      const activity = await createActivityWithOneCapacity(schedule.id);
      await createActivityBooking(activity.id, user.id);

      const response = await server.post(`/activities/${schedule.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 200 and an activity', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      const ticketType = await createTicketTypeWithHotel();
      const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      await createPayment(ticket.id, ticketType.price);
      const schedule = await createSchedule();
      await createActivity(schedule.id);

      const response = await server.post(`/activities/${schedule.id}`).set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.CREATED);
    });
  });
});
