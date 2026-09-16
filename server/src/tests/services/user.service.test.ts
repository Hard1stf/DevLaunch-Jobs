import { describe, vi, expect, it, beforeEach } from 'vitest';

import { UserModel } from '../../models/User.js';
import {
  getCurrentUser,
  updateCurrentUserProfile,
} from '../../services/user.service.js';

vi.mock('../../models/User.js', () => ({
  UserModel: {
    findById: vi.fn(),
  },
}));

describe('getCurrentUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the serialized current user', async () => {
    const mockUser = {
      _id: 'user-123',
      email: 'hardik@example.com',
      role: 'candidate' as const,
      profile: {
        firstName: 'Hardik',
        lastName: 'Vijeta',
        location: 'Muzaffarpur',
        bio: 'Frontend developer',
        skills: ['React', 'Node.js'],
      },
    };

    vi.mocked(UserModel.findById).mockResolvedValue(mockUser as never);

    const result = await getCurrentUser('user-123');

    expect(UserModel.findById).toHaveBeenCalledWith('user-123');

    expect(result).toEqual({
      id: 'user-123',
      email: 'hardik@example.com',
      role: 'candidate',
      profile: {
        firstName: 'Hardik',
        lastName: 'Vijeta',
        location: 'Muzaffarpur',
        bio: 'Frontend developer',
        skills: ['React', 'Node.js'],
      },
    });
  });

  it('should normalize the null profile fields', async () => {
    const mockUser = {
      _id: 'user-123',
      email: 'hardik@example.com',
      role: 'candidate' as const,
      profile: {
        firstName: null,
        lastName: null,
        location: null,
        bio: null,
        skills: null,
      },
    };

    vi.mocked(UserModel.findById).mockResolvedValue(mockUser as never);

    const result = await getCurrentUser('user-123');

    expect(result).toEqual({
      id: 'user-123',
      email: 'hardik@example.com',
      role: 'candidate',
      profile: {
        firstName: undefined,
        lastName: undefined,
        location: undefined,
        bio: undefined,
        skills: [],
      },
    });
  });

  it('should normalize a missing profile', async () => {
    const mockUser = {
      _id: 'user-123',
      email: 'hardik@example.com',
      role: 'candidate' as const,
      profile: null,
    };

    vi.mocked(UserModel.findById).mockResolvedValue(mockUser as never);

    const result = await getCurrentUser('user-123');

    expect(result).toEqual({
      id: 'user-123',
      email: 'hardik@example.com',
      role: 'candidate',
      profile: {
        firstName: undefined,
        lastName: undefined,
        location: undefined,
        bio: undefined,
        skills: [],
      },
    });
  });

  it('should throw when user does not exist', async () => {
    vi.mocked(UserModel.findById).mockResolvedValue(null);

    await expect(getCurrentUser('missing-user')).rejects.toMatchObject({
      statusCode: 404,
      message: 'User not Found',
    });

    expect(UserModel.findById).toHaveBeenCalledWith('missing-user');
  });
});

describe('updateCurrentUserProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update the profile and return the serialized user', async () => {
    const saveMock = vi.fn().mockResolvedValue(undefined);

    const mockUser = {
      _id: 'user-123',
      email: 'hardik@example.com',
      role: 'candidate' as const,
      profile: {
        firstName: 'Hardik',
        lastName: 'Vijeta',
        location: 'Patna',
        bio: 'Frontend developer',
        skills: ['JavaScript'],
      },
      save: saveMock,
    };

    vi.mocked(UserModel.findById).mockResolvedValue(mockUser as never);

    const input = {
      firstName: 'Hardik',
      location: 'Muzaffarpur',
      bio: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'MongoDB'],
    };

    const result = await updateCurrentUserProfile('user-123', input);

    expect(UserModel.findById).toHaveBeenCalledWith('user-123');

    expect(mockUser.profile).toEqual({
      firstName: 'Hardik',
      lastName: 'Vijeta',
      location: 'Muzaffarpur',
      bio: 'Full Stack Developer',
      skills: ['React', 'Node.js', 'MongoDB'],
    });

    expect(saveMock).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      id: 'user-123',
      email: 'hardik@example.com',
      role: 'candidate',
      profile: {
        firstName: 'Hardik',
        lastName: 'Vijeta',
        location: 'Muzaffarpur',
        bio: 'Full Stack Developer',
        skills: ['React', 'Node.js', 'MongoDB'],
      },
    });
  });

  it('should preserve existing profile fields when they are not updated', async () => {
    const saveMock = vi.fn().mockResolvedValue(undefined);

    const mockUser = {
      _id: 'user-123',
      email: 'hardik@example.com',
      role: 'candidate' as const,
      profile: {
        firstName: 'Hardik',
        lastName: 'Vijeta',
        location: 'Patna',
        bio: 'Existing bio',
        skills: ['JavaScript'],
      },
      save: saveMock,
    };

    vi.mocked(UserModel.findById).mockResolvedValue(mockUser as never);

    await updateCurrentUserProfile('user-123', {
      location: 'Muzaffarpur',
    });

    expect(mockUser.profile).toEqual({
      firstName: 'Hardik',
      lastName: 'Vijeta',
      location: 'Muzaffarpur',
      bio: 'Existing bio',
      skills: ['JavaScript'],
    });

    expect(saveMock).toHaveBeenCalledTimes(1);
  });

  it('should throw when the user does not exist', async () => {
    vi.mocked(UserModel.findById).mockResolvedValue(null);

    await expect(
      updateCurrentUserProfile('missing-user', {
        firstName: 'Hardik',
      }),
    ).rejects.toMatchObject({
      statusCode: 404,
      message: 'User Not Found',
    });

    expect(UserModel.findById).toHaveBeenCalledWith('missing-user');
  });
});
