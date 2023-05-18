import { User } from '@prisma/client';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { invalidCredentialsError } from './errors';
import { exclude } from '@/utils/prisma-utils';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';

dotenv.config();

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function signInWithGitHub(code: string): Promise<SignInResult> {
  const { GITHUB_URL, CLIENT_ID, REDIRECT_URL, CLIENT_SECRET } = process.env;

  const gitHubAuthorizationPayload = {
    code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URL,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };

  const {
    data: { access_token },
  } = await axios.post(GITHUB_URL, gitHubAuthorizationPayload, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  });

  const user = await getValidUserFromGitHubTokenOrFail(access_token);
  const token = await createSession(user.id);

  return { token, user: exclude(user, 'password') };
}

async function getValidUserFromGitHubTokenOrFail(token: string): Promise<GetUserOrFailResult> {
  const { GITHUB_USER_URL } = process.env;

  const {
    data: { email },
  } = await axios.get(GITHUB_USER_URL, { headers: { Authorization: `Bearer ${token}` } });

  return getUserOrFail(email);
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

const authenticationService = {
  signIn,
  signInWithGitHub,
};

export default authenticationService;
export * from './errors';
