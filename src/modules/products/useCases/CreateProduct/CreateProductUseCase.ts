import { inject, injectable } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';

import ICreateProductDTO from '../../dtos/ICreateProductDTO';
import IProductsRepository from '../../repositories/IProductsRepository';

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute({ name, price, quantity }: ICreateProductDTO): Promise<Product> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError('This product already exists!');
    }

    const product = this.productsRepository.create({ name, price, quantity });

    await this.productsRepository.save(product);

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    return product;
  }
}

export default CreateProductUseCase;
