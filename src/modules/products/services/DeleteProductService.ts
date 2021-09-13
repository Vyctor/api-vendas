import Product from '../typeorm/entities/Product';
import { getRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import RedisCache from '../../../shared/cache/RedisCache';

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

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;
