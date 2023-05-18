import { prisma } from '@/config';
import { redis } from '@/config/redis';

async function getCachedEvent(cacheKey: string): Promise<Event | null> {
  const cacheEvent = await redis.get(cacheKey);
  if (cacheEvent) {
    const event = JSON.parse(cacheEvent);
    return event;
  }

  return null;
}

async function findFirst() {
  const cacheKey = 'event';
  const cacheEvent = await getCachedEvent(cacheKey);

  if (cacheEvent) return cacheEvent;
  return await prisma.event.findFirst();

  redis.set(cacheKey, JSON.stringify(event));
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
