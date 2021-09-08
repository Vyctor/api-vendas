import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListAllUsersService from '../services/ListAllUsersService';

class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllUsersService = new ListAllUsersService();

    const users = await listAllUsersService.execute();

    return response.json(users);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return response.json(user);
  }
}

export default UsersController;
