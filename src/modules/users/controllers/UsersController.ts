import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListAllUsersService from '../services/ListAllUsersService';
import { classToClass } from 'class-transformer';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllUsersService = new ListAllUsersService();

    const users = await listAllUsersService.execute();

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return response.json(classToClass(user));
  }
}

export default UsersController;
