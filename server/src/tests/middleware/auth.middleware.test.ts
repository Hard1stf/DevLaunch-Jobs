import { describe, beforeEach, expect, it, vi } from 'vitest';
import type { Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

import jwt from 'jsonwebtoken';

import {
  authenticate,
  type AuthenticatedRequest,
} from '../../middleware/auth.middleware.js';

vi.mock(import('jsonwebtoken'), async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    default: {
      ...actual.default,
      verify: vi.fn(),
    },
  };
});

vi.mock(import('../../config/env.js'), async () => ({
  env: {
    jwtSecret: 'test-secret',
  } as (typeof import('../../config/env.js'))['env'],
}));

const createRequest = (token?: string): AuthenticatedRequest =>
  ({
    cookies: token ? { accessToken: token } : {},
  }) as AuthenticatedRequest;

const createResponse = (): Response => ({}) as Response;

describe('authenticate middleware', () => {
  let next: NextFunction;

  beforeEach(() => {
    vi.resetAllMocks();
    next = vi.fn() as unknown as NextFunction;
  });

  it('forwards a 401 error when the token is invalid or expired', () => {
    const req = createRequest('invalid-token');
    const res = createResponse();

    vi.mocked(jwt.verify).mockImplementation(() => {
      throw new Error('jwt expired');
    });

    authenticate(req, res, next);

    expect(jwt.verify).toHaveBeenCalledOnce();
    expect(jwt.verify).toHaveBeenCalledWith('invalid-token', 'test-secret');

    expect(next).toHaveBeenCalledOnce();
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 401,
        message: 'Invalid or expired authentication token',
      }),
    );

    expect(req.user).toBeUndefined();
  });

  it('forwards a 401 error when the decoded payload is invalid', () => {
    const req = createRequest('malformed-token');
    const res = createResponse();

    vi.mocked(jwt.verify).mockImplementation(
      () =>
        ({
          userId: 'user-123',
          role: 'admin',
        }) as JwtPayload,
    );

    authenticate(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('malformed-token', 'test-secret');

    expect(next).toHaveBeenCalledOnce();
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 401,
        message: 'Invalid authentication token',
      }),
    );

    expect(req.user).toBeUndefined();
  });

  it.each([
    {
      role: 'candidate' as const,
      userId: 'candidate-123',
    },
    {
      role: 'recruiter' as const,
      userId: 'recruiter-123',
    },
  ])('authenticates a valid $role token', ({ role, userId }) => {
    const req = createRequest('valid-token');
    const res = createResponse();

    vi.mocked(jwt.verify).mockImplementation(
      () => ({ userId, role }) as JwtPayload,
    );

    authenticate(req, res, next);

    expect(jwt.verify).toHaveBeenCalledWith('valid-token', 'test-secret');

    expect(req.user).toEqual({ userId, role });

    expect(next).toHaveBeenCalledOnce();
    expect(next).toHaveBeenCalledWith();
  });

  it('forwards 401 error when the access token is missing', () => {
    const req = createRequest();
    const res = createResponse();

    authenticate(req, res, next);

    expect(jwt.verify).not.toHaveBeenCalled();

    expect(next).toHaveBeenCalledOnce();
    expect(next).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 401,
        message: 'Authentication required',
      }),
    );

    expect(req.user).toBeUndefined();
  });
});
