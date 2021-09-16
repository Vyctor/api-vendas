import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

import IProductsRepository from '../IProductsRepository';

class InMemoryProductsRepository implements IProductsRepository {
  products: Array<Product> = [];

  async create(data: Product): Promise<Product> {
    throw new Error('Method not implemented.');
  }

  async update(data: Product): Promise<Product> {
    const product = this.products.find((product) => product.id === data.id);

    if (!product) {
      throw new AppError('Product does not exists!');
    }

    const replaceNameAlreadyUsedByAnotherProduct = this.products.find((product) => product.name === data.name && product.id !== data.id);

    if (replaceNameAlreadyUsedByAnotherProduct) {
      throw new AppError('There is already one product with this name!');
    }

    Object.assign(product, {
      name: data.name,
      price: data.price,
      quantity: data.quantity,
    });

    const productIndex = this.products.findIndex((product) => product.id === data.id);

    this.products[productIndex] = product;

    return product;
  }

  async listProducts(): Promise<Product[]> {
    return this.products;
  }

  async findById(id: string): Promise<Product> {
    return this.products.find((product) => product.id === id);
  }

  async findByName(name: string): Promise<Product> {
    return this.products.find((product) => product.name === name);
  }

  async findAllByIds(productsId: string[]): Promise<Product[]> {
    return this.products.filter((product) => productsId.includes(product.id));
  }

  async deleteById(id: string): Promise<void> {
    this.products = this.products.filter((product) => product.id !== id);
  }
}

export default InMemoryProductsRepository;
