import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSessionUseCase from './CreateSessionUseCase';

class CreateSessionController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSessionUseCase = container.resolve(CreateSessionUseCase);

    const user = await createSessionUseCase.execute({ email, password });

    return response.json(classToClass(user));
  }
}

export default CreateSessionController;
