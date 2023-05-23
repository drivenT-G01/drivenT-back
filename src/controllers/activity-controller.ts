import { NextFunction } from 'express';
// eslint-disable-next-line import/no-unresolved
import { AuthenticatedRequest } from '@/middlewares';

export async function getHotels(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;

  try {
  } catch (error) {
    next(error);
  }
}
