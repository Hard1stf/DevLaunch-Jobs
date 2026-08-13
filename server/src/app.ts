import express from 'express';
import errorMiddleware from './middleware/error.middleware.js';
import router from './routes/index.js';

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(errorMiddleware);

export default app;
