import ProductsRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

class ListProductService {
  async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const redisCache = new RedisCache();

    const products = await productsRepository.find();

    await redisCache.save('teste', 'teste');

    return products;
  }
}

export default ListProductService;
