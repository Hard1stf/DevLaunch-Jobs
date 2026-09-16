import { UserModel } from '../models/User.js';
import { APIError } from '../utils/APIError.js';
import type { UpdateProfileInput } from '../validators/user.validator.js';

const serializeUser = (user: {
  _id: unknown;
  email: string;
  role: 'candidate' | 'recruiter';
  profile?: {
    firstName?: string | null;
    lastName?: string | null;
    location?: string | null;
    bio?: string | null;
    skills?: string[] | null;
  } | null;
}) => {
  return {
    id: user._id,
    email: user.email,
    role: user.role,
    profile: {
      firstName: user.profile?.firstName ?? undefined,
      lastName: user.profile?.lastName ?? undefined,
      location: user.profile?.location ?? undefined,
      bio: user.profile?.bio ?? undefined,
      skills: user.profile?.skills ?? [],
    },
  };
};

export const getCurrentUser = async (userId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) throw new APIError(404, 'User not Found');

  return serializeUser(user);
};

export const updateCurrentUserProfile = async (
  userId: string,
  input: UpdateProfileInput,
) => {
  const user = await UserModel.findById(userId);

  if (!user) throw new APIError(404, 'User Not Found');

  user.profile = {
    ...user.profile,
    ...input,
  };

  await user.save();

  return serializeUser(user);
};
