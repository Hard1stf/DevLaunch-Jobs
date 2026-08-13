import { z } from 'zod';
import type { SignOptions } from 'jsonwebtoken';

const mongooseURI = process.env.MONGO_DB_URI;
const jwtSecret = process.env.JWT_SECRET;

// create a validation for .env variables.
const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  MONGO_DB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.string().default('7d'),
});

// safely parsed all the .env variables.
const parsedEnv = envSchema.parse(process.env);

// Extract JWT expiration time from parsed env and cast to the correct SignOptions type.
// SignOptions['expiresIn'] accepts: number (seconds), string (e.g., '7d', '2h'), or undefined.
// This ensures TypeScript knows 'jwtExpiresIn' matches the expected format for jwt.sign().
const jwtExpiresIn = parsedEnv.JWT_EXPIRES_IN as SignOptions['expiresIn'];

if (!jwtSecret) throw new Error('JWT_SECRET is not defined');

if (!mongooseURI) throw new Error('MONGO_DB_URI is not defined.');

export const env = {
  port: parsedEnv.PORT,
  mongooseURI: parsedEnv.MONGO_DB_URI,
  jwtSecret: parsedEnv.JWT_SECRET,
  jwtExpiresIn,
};
