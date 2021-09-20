import { inject, injectable } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

import IProductsRepository from '../../repositories/IProductsRepository';

@injectable()
class ListProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute(): Promise<Product[]> {
    let products = await RedisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if (!products) {
      products = await this.productsRepository.showAllProducts();
      await RedisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductUseCase;
