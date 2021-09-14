import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowOrderUseCase from './ShowOrderUseCase';

class ShowOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrderUseCase = container.resolve(ShowOrderUseCase);

    const order = await showOrderUseCase.execute({ id });

    return response.json(order);
  }
}

export default ShowOrderController;
