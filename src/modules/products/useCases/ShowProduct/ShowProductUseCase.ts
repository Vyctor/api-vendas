import { inject, injectable } from 'tsyringe';

import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

import IProductsRepository from '../../repositories/IProductsRepository';

interface IRequest {
  id: string;
}
@injectable()
class ShowProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product does not exists!');
    }

    return product;
  }
}

export default ShowProductUseCase;
