import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function isAuthenticated(request: Request, response: Response, nextFunction: NextFunction): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT is missing!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub } = verify(token, auth.jwt.secret) as ITokenPayload;

    request.user = {
      id: sub,
    };

    return nextFunction();
  } catch (error) {
    throw new AppError('Invalid JWT!');
  }
}

export default isAuthenticated;
