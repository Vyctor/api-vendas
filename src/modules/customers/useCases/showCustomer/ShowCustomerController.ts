import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';

import ShowCustomerUseCase from './ShowCustomerUseCase';

@injectable()
class ShowCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerUseCase = container.resolve(ShowCustomerUseCase);

    const customer = await showCustomerUseCase.execute({ id });

    return response.json(customer);
  }
}

export default ShowCustomerController;
