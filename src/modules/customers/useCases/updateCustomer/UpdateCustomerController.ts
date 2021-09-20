import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateCustomerUseCase from './UpdateCustomerUseCase';

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
