import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderUseCase from './CreateOrderUserCase';

class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

    const order = await createOrderUseCase.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }
}

export default CreateOrderController;
