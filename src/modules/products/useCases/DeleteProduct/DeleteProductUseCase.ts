import { getRepository } from 'typeorm';

import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';

import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  id: string;
}

class DeleteProductUseCase {
  async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product does not exists!');
    }

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductUseCase;
