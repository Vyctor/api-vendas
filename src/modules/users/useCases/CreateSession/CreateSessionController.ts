import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import CreateSessionService from '@modules/users/services/CreateSessionService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionService = new CreateSessionService();

    const user = await createSessionService.execute({ email, password });

    return response.json(classToClass(user));
  }
}

export default SessionsController;
