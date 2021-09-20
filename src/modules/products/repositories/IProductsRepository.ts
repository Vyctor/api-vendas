import IUpdateProductStockDTO from '@modules/orders/dtos/IUpdateProductStockDTO';

import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  create(data: ICreateProductDTO): Product;
  save(product: Product): Promise<void>;
  updateProductStock(products: IUpdateProductStockDTO[]): Promise<void>;
  showAllProducts(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  findByName(name: string): Promise<Product>;
  findAllByIds(productsId: string[]): Promise<Product[]>;
  deleteById(id: string): Promise<void>;
}

export default IProductsRepository;
