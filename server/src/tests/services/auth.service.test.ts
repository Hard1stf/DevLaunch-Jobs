import { describe, vi, expect, it, beforeEach } from 'vitest';

import { UserModel } from '../../models/User.js';
import { getCurrentUserService } from '../../services/auth.service.js';


vi.mock('../../models/User.js', () => ({
  UserModel: { findById: vi.fn() },
}));

vi.mock('../../utils/jwt.js', () => ({
    generateToken: vi.fn(),
}));

describe('getCurrentUserService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the serialized current user', async () => {
    const mockUser = {
      _id: 'user-123',
      email: 'hardiktest@gmail.com',
      role: 'candidate' as const,
      passwordHash: 'should-not-be-returned',
    };

    vi.mocked(UserModel.findById).mockResolvedValue(mockUser as never);

    const result = await getCurrentUserService('user-123');

    expect(UserModel.findById).toHaveBeenCalledWith('user-123');

    expect(result).toEqual({
      id: 'user-123',
      email: 'hardiktest@gmail.com',
      role: 'candidate',
    });

    expect(result).not.toHaveProperty('passwordHash');
  });

  it('should throw a 404 error when the user does not exist', async () => {
    vi.mocked(UserModel.findById).mockResolvedValue(null);

    await expect(getCurrentUserService('missing-user')).rejects.toMatchObject({
      statusCode: 404,
      message: 'User not Found',
    });

    expect(UserModel.findById).toHaveBeenCalledWith('missing-user');
  });
});
