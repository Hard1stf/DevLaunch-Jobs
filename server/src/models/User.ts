import { model, Schema, type InferSchemaType } from 'mongoose';

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    skill: {
      type: [String],
      default: [],
    },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ['candidate', 'recruiter'],
      required: true,
    },
    profile: {
      type: profileSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

export type User = InferSchemaType<typeof userSchema>;
export const UserModel = model<User>('User', userSchema);
