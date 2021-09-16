import { inject } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';

import IProductsRepository from '../../repositories/IProductsRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('This product already exists!');
    }

    const product = new Product();

    Object.assign(product, {
      name,
      price,
      quantity,
    });

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.create(product);

    return product;
  }
}

export default CreateProductUseCase;
