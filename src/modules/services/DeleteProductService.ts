import Product from '../products/typeorm/entities/Product';
import { getRepository } from 'typeorm';
import AppError from '../../shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteProductService {
  async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product does not exists!');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
