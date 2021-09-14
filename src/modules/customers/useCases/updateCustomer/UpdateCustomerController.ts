import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';

import UpdateCustomerUseCase from './UpdateCustomerUseCase';

@injectable()
class UpdateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase);

    const updatedCustomer = await updateCustomerUseCase.execute({
      id,
      name,
      email,
    });

    return response.json(updatedCustomer);
  }
}

export default UpdateCustomerController;
