import Product from '@modules/products/infra/typeorm/entities/Product';

import IProductsRepository from '../IProductsRepository';

class InMemoryProductsRepository implements IProductsRepository {
  products: Array<Product> = [];

  async findByName(name: string): Promise<Product> {
    return this.products.find((product) => product.name === name);
  }

  async findAllByIds(productsId: string[]): Promise<Product[]> {
    return this.products.filter((product) => productsId.includes(product.id));
  }
}

export default InMemoryProductsRepository;
