import ProductRepository from '@modules/products/typeorm/repositories/ProductsRepository';
import { getCustomRepository } from 'typeorm';
import Product from '../products/typeorm/entities/Product';

class ListProductService {
  async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = await productsRepository.find();
    return products;
  }
}

export default ListProductService;
