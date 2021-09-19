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

  async create({ name, price, quantity }: ICreateProductDTO): Promise<Product> {
    const product = this.repository.create({
      name,
      price,
      quantity,
    });

    return this.repository.save(product);
  }

  async update(updatedProduct: Product): Promise<Product> {
    return this.repository.save(updatedProduct);
  }

  async updateProductStock(products: IUpdateProductStockDTO[]): Promise<void> {
    await this.repository.save(products);
  }

  async listProducts(): Promise<Product[]> {
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
