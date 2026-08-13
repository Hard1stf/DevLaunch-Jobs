import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.js';
import type { RegisterInput } from '../validators/auth.validator.js';
import { APIError } from '../utils/APIError.js';

export const registerUser = async (input: RegisterInput) => {
  const existingUser = await UserModel.findOne({ email: input.email });

  if (existingUser) throw new APIError(409, 'Email is already registered');

  const passwordHash = await bcrypt.hash(input.password, 12);

  const user = await UserModel.create({
    email: input.email,
    passwordHash,
    role: input.role,
  });

  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
};
