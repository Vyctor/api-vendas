import IUpdateProductStockDTO from '@modules/orders/dtos/IUpdateProductStockDTO';

import Product from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  listProducts(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  findByName(name: string): Promise<Product>;
  findAllByIds(productsId: string[]): Promise<Product[]>;
  update(data: Product): Promise<Product>;
  updateProductStock(products: IUpdateProductStockDTO[]): Promise<void>;
  create(data: Product): Promise<Product>;
  deleteById(id: string): Promise<void>;
}

export default IProductsRepository;
