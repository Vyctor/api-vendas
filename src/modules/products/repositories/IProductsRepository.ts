import IUpdateProductStockDTO from '@modules/orders/dtos/IUpdateProductStockDTO';

import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

interface IProductsRepository {
  listProducts(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  findByName(name: string): Promise<Product>;
  findAllByIds(productsId: string[]): Promise<Product[]>;
  deleteById(id: string): Promise<void>;
  update(updatedProduct: Product): Promise<Product>;
  updateProductStock(products: IUpdateProductStockDTO[]): Promise<void>;
  create(data: ICreateProductDTO): Promise<Product>;
}

export default IProductsRepository;
