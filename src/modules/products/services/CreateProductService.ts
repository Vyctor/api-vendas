import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';
import RedisCache from '../../../shared/cache/RedisCache';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const redisCache = new RedisCache();

    const productsRepository = getCustomRepository(ProductsRepository);

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('This product already exists!');
    }

    const product = productsRepository.create({
      name,
      price,
      quantity,
    });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
