import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import AppError from '@shared/errors/AppError';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}
// TODO: Implementar IProductsRepository
@injectable()
class CreateOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private readonly ordersRepository: IOrdersRepository,
    @inject('CustomersRepository')
    private readonly customersRepostory: ICustomersRepository,
    @inject('productsRepository')
    private readonly productsRepository: IProductsRepository,
  ) {}

  async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await this.customersRepostory.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Customer does not exists!');
    }

    const existsProducts = await this.productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids!');
    }

    const existsProductsIds = existsProducts.map((product) => product.id);

    const inexistantProducts = products.filter((product) => !existsProductsIds.includes(product.id));

    if (inexistantProducts.length) {
      throw new AppError(`Could not find products: ${inexistantProducts.map((product) => product.id)}`);
    }

    const quantityAvailable = products.filter(
      (product) => existsProducts.filter((p) => p.id === product.id)[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(`The quantity of ${quantityAvailable.map((product) => product.id)} is not available for purchase!`);
    }

    const serializedProducts = products.map((product) => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter((p) => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map((orderProduct) => ({
      id: orderProduct.product.id,
      quantity: existsProducts.filter((p) => p.id === orderProduct.product_id)[0].quantity - orderProduct.quantity,
    }));

    await this.productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderUseCase;
