import { inject, injectable } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';

import IUpdateProductDTO from '../../dtos/IUpdateProductDTO';
import IProductsRepository from '../../repositories/IProductsRepository';

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute({ id, name, price, quantity }: IUpdateProductDTO): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product does not exists!');
    }

    const replaceNameAlreadyUsedByAnotherProduct = await this.productsRepository.findByName(name);

    if (replaceNameAlreadyUsedByAnotherProduct) {
      throw new AppError('There is already one product with this name!');
    }

    Object.assign(product, {
      name,
      price,
      quantity,
    });

    await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productsRepository.update(product);

    return product;
  }
}

export default UpdateProductUseCase;
