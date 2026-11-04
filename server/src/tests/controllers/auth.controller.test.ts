import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { NextFunction, Response } from 'express';
import { Types } from 'mongoose';

import { getCurrentUser } from '../../controllers/auth.controller.js';
import { getCurrentUserService } from '../../services/auth.service.js';
import type { AuthenticatedRequest } from '../../middleware/auth.middleware.js';

vi.mock(import('../../services/auth.service.js'), () => ({
  getCurrentUserService: vi.fn(),
  loginUser: vi.fn(),
  registerUser: vi.fn(),
}));

type MockResponse = {
  status: ReturnType<typeof vi.fn>;
  json: ReturnType<typeof vi.fn>;
};

const createResponse = (): MockResponse => {
  const res = {
    status: vi.fn(),
    json: vi.fn(),
  };

  res.status.mockReturnValue(res);
  res.json.mockReturnValue(res);

  return res;
};

const createAuthenticatedRequest = (userId: string): AuthenticatedRequest =>
  ({
    user: {
      userId,
      role: 'candidate',
    },
  }) as AuthenticatedRequest;

describe('getCurrentUser controller', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('returns the current user with a 200 success response', async () => {
    const user = {
      id: new Types.ObjectId(),
      email: 'hardik@example.com',
      role: 'candidate' as const,
    };

    vi.mocked(getCurrentUserService).mockResolvedValue(user);

    const req = createAuthenticatedRequest('user-123');
    const res = createResponse();
    const next = vi.fn() as unknown as NextFunction;

    await getCurrentUser(req, res as unknown as Response, next);

    expect(getCurrentUserService).toHaveBeenCalledOnce();
    expect(getCurrentUserService).toHaveBeenCalledWith('user-123');

    expect(res.status).toHaveBeenCalledOnce();
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledOnce();
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: user,
        message: 'Current user fetched successfully',
      }),
    );

    expect(next).not.toHaveBeenCalled();
  });

  it('forwards service errors to the error handler', async () => {
    const error = new Error('User not Found');

    vi.mocked(getCurrentUserService).mockRejectedValue(error);

    const req = createAuthenticatedRequest('missing-user');
    const res = createResponse();
    const next = vi.fn() as unknown as NextFunction;

    await getCurrentUser(req, res as unknown as Response, next);

    expect(getCurrentUserService).toHaveBeenCalledOnce();
    expect(getCurrentUserService).toHaveBeenCalledWith('missing-user');

    expect(next).toHaveBeenCalledOnce();
    expect(next).toHaveBeenCalledWith(error);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
