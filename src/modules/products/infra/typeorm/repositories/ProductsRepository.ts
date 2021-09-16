import { getRepository, In, Repository } from 'typeorm';

import IProductsRepository from '../../../repositories/IProductsRepository';
import Product from '../entities/Product';

class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  async findByName(name: string): Promise<Product> {
    const product = this.repository.findOne({
      where: {
        name,
      },
    });

    return product;
  }
  async findAllByIds(productsId: string[]): Promise<Product[]> {
    const existsProducts = await this.repository.find({
      where: {
        id: In(productsId),
      },
    });

    return existsProducts;
  }
}

export default ProductsRepository;
