import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllUsersUseCase from './ShowAllUsersUseCase';

class ShowAllUsersController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const listAllUsersUseCase = container.resolve(ListAllUsersUseCase);

    const users = await listAllUsersUseCase.execute();

    return response.json(classToClass(users));
  }
}

export default ShowAllUsersController;
