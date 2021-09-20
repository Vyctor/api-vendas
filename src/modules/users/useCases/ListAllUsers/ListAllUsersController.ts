import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllUsersUseCase from './ListAllUsersUseCase';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);

    const users = await listAllUsersUseCase.execute();

    return response.json(classToClass(users));
  }
}

export default UsersController;
