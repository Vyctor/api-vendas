import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListCustomersUseCase from './ListCustomersUseCase';

class ListCustomersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCustomersUseCase = container.resolve(ListCustomersUseCase);

    const customers = await listCustomersUseCase.execute();

    return response.json(customers);
  }
}

export default ListCustomersController;
