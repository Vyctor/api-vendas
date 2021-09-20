import { inject, injectable } from 'tsyringe';

import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';

import IProductsRepository from '../../repositories/IProductsRepository';

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}
  async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product does not exists!');
    }

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.deleteById(product.id);
  }
}

export default DeleteProductUseCase;
