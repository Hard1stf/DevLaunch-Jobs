import bcrypt from 'bcryptjs';
import { UserModel } from '../models/User.js';
import type {
  RegisterInput,
  LoginInput,
} from '../validators/auth.validator.js';
import { APIError } from '../utils/APIError.js';
import { generateToken } from '../utils/jwt.js';

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
    id: user._id,
    email: user.email,
    role: user.role,
  };
};

export const loginUser = async (input: LoginInput) => {
  const user = await UserModel.findOne({
    email: input.email,
  }).select('+passwordHash'); // this is overriding the schema select:false.

  if (!user) throw new APIError(401, 'Invalid email and password');

  const isPasswordValid = await bcrypt.compare(
    input.password,
    user.passwordHash,
  );

  if (!isPasswordValid) throw new APIError(401, 'Invalid email and password');

  const token = generateToken({
    userId: user._id.toString(),
    role: user.role,
  });

  return {
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    token,
  };
};
