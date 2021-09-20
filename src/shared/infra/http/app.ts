import 'reflect-metadata';
import 'dotenv/config';

import '../../container';

import { errors } from 'celebrate';
import 'express-async-errors';
import cors from 'cors';
import express, { Request, Response } from 'express';
import { pagination } from 'typeorm-pagination';

import uploadConfig from '@config/upload';

import AppError from '../../errors/AppError';
import '@shared/infra/typeorm';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
app.use(pagination);
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());

app.use((error: Error, request: Request, response: Response) => {
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
});

export { app };
