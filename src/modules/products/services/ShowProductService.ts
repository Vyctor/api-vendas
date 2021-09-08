import Product from '../typeorm/entities/Product';
import { getRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  id: string;
}
class ShowProductService {
  async execute({ id }: IRequest): Promise<Product> {
    const productsRepository = getRepository(Product);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product does not exists!');
    }

    return product;
  }
}

export default ShowProductService;
