import 'dotenv/config';
import app from './app.js';
import { env } from './config/env.js';
import { connectDB } from './config/db.js';

const startServer = async (): Promise<void> => {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Server listening on http://localhost:${env.port}`);
  });
};

startServer();
