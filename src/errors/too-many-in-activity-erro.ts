import { ApplicationError } from '@/protocols';

export function tooManyInActivityError(): ApplicationError {
  return {
    name: 'TooManyInActivityError',
    message: 'The Activity is full!',
  };
}
