import { getRepository } from 'typeorm';
import Product from '../products/typeorm/entities/Product';

class ListProductService {
  async execute(): Promise<Product[]> {
    const productRepository = getRepository(Product);

    const products = await productRepository.find();
    return products;
  }
}

export default ListProductService;
