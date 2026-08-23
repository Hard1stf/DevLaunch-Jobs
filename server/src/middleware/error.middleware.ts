import { ErrorRequestHandler } from 'express';
import { APIError } from '../utils/APIError.js';
import z from 'zod';

const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);

  if (err instanceof APIError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof z.ZodError) {
    const message = err.issues.map((issue) => issue.message).join(', ');

    const apiError = new APIError(400, message || 'Invalid Request');

    res.status(apiError.statusCode).json({
      success: false,
      message: apiError.message,
    });

    return;
  }

  if(err?.code === 11000){
    const apiError = new APIError(409, 'Resource is already exists');

    res.status(apiError.statusCode).json({
      success: false,
      message: apiError.message,
    });
    return;
  }

  res.status(500).json({ success: false, message: 'Internal server error' });
};

export default errorMiddleware;
