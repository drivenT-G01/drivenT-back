import { ApplicationError } from '@/protocols';

export function userAlreadyHaveOnThisTimeError(): ApplicationError {
  return {
    name: 'UserAlreadyHaveActivityOnThisTimeError',
    message: 'You already have an activity on current time, please choose another!',
  };
}
