import Product from '../typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import ProductsRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne({ id });

    if (!product) {
      throw new AppError('Product does not exists!');
    }

    const replaceNameAlreadyUsedByAnotherProduct =
      await productsRepository.findByName(name);

    if (replaceNameAlreadyUsedByAnotherProduct) {
      throw new AppError('There is already one product with this name!');
    }

    Object.assign(product, {
      name,
      price,
      quantity,
    });

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
