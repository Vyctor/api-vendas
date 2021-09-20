import { injectable } from 'tsyringe';
import { getRepository, In, Repository } from 'typeorm';

import IUpdateProductStockDTO from '../../../../orders/dtos/IUpdateProductStockDTO';
import ICreateProductDTO from '../../../dtos/ICreateProductDTO';
import IProductsRepository from '../../../repositories/IProductsRepository';
import Product from '../entities/Product';

@injectable()
class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  create({ name, price, quantity }: ICreateProductDTO): Product {
    return this.repository.create({
      name,
      price,
      quantity,
    });
  }

  async save(product: Product): Promise<void> {
    await this.repository.save(product);
  }

  async updateProductStock(products: IUpdateProductStockDTO[]): Promise<void> {
    await this.repository.save(products);
  }

  async showAllProducts(): Promise<Product[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.repository.findOne({ id });

    return product;
  }

  async findByName(name: string): Promise<Product> {
    const product = await this.repository.findOne({
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

  async deleteById(productId: string): Promise<void> {
    await this.repository.delete(productId);
  }
}

export default ProductsRepository;
