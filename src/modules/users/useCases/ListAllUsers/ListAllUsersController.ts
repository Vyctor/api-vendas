import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import CreateUserService from '@modules/users/services/CreateUserService';
import ListAllUsersService from '@modules/users/services/ListAllUsersService';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllUsersService = new ListAllUsersService();

    const users = await listAllUsersService.execute();

    return response.json(classToClass(users));
  }
}

export default UsersController;
