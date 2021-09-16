import Product from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  findByName(name: string): Promise<Product>;
  findAllByIds(productsId: string[]): Promise<Product[]>;
}

export default IProductsRepository;
