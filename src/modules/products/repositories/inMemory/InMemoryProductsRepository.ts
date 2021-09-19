import IUpdateProductStockDTO from '@modules/orders/dtos/IUpdateProductStockDTO';
import Product from '@modules/products/infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

import ICreateProductDTO from '../../dtos/ICreateProductDTO';
import IProductsRepository from '../IProductsRepository';

class InMemoryProductsRepository implements IProductsRepository {
  private products: Array<Product> = [];

  async create({ name, price, quantity }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      name,
      price,
      quantity,
    });

    this.products.push(product);

    return product;
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

  async updateProductStock(products: IUpdateProductStockDTO[]): Promise<void> {
    products.forEach((updatedProduct) => {
      const productIndex = this.products.findIndex((product) => product.id === updatedProduct.id);

      this.products[productIndex].quantity = updatedProduct.quantity;
    });
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
