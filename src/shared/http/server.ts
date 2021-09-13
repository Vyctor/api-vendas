import 'reflect-metadata';
import 'dotenv/config';

import express, { NextFunction, Request, Response } from 'express';
import { pagination } from 'typeorm-pagination';
import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes';
import AppError from '../errors/AppError';
import '@shared/typeorm';
import upload from '@config/upload';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(upload.directory));
app.use(routes);
app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.listen(process.env.APP_API_PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running');
});
