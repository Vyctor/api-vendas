import Product from '../products/typeorm/entities/Product';
import { getRepository } from 'typeorm';
import AppError from '../../shared/errors/AppError';
interface IRequest {
  id: string;
}
class ShowProductService {
  async execute({ id }: IRequest): Promise<Product> {
    const productService = getRepository(Product);

    const product = await productService.findOne(id);

    if (!product) {
      throw new AppError('Product does not exists!');
    }

    return product;
  }
}

export default ShowProductService;
