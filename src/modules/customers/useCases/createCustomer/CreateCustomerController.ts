import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCustomerUseCase from './CreateCustomerUseCase';

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

    const customer = await createCustomerUseCase.execute({
      name,
      email,
    });

    return response.json(customer);
  }
}

export default CreateCustomerController;
