import { getCustomRepository } from 'typeorm';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import RedisCache from '@shared/cache/RedisCache';

import Product from '../infra/typeorm/entities/Product';

class ListProductService {
  async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);

    let products = await RedisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if (!products) {
      products = await productsRepository.find();
      await RedisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}

export default ListProductService;
