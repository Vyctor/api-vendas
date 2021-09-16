import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProductUseCase from './UpdateProductUseCase';

export class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const { id } = request.params;

    const updateProductUseCase = container.resolve(UpdateProductUseCase);

    const updatedProduct = await updateProductUseCase.execute({
      id,
      name,
      price,
      quantity,
    });

    return response.json(updatedProduct);
  }
}

export default UpdateProductController;
