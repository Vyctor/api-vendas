import { getCustomRepository } from 'typeorm';

import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import AppError from '../../../shared/errors/AppError';
import ProductsRepository from '../../products/infra/typeorm/repositories/ProductsRepository';
import Order from '../infra/typeorm/entities/Order';
import OrdersRepository from '../infra/typeorm/repositories/OrderRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  async execute({ customer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const customerRepository = getCustomRepository(CustomersRepository);
    const productsRepository = getCustomRepository(ProductsRepository);

    const customerExists = await customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Customer does not exists!');
    }

    const existsProducts = await productsRepository.findAllByIds(products);

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

    const order = await ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map((orderProduct) => ({
      id: orderProduct.product.id,
      quantity: existsProducts.filter((p) => p.id === orderProduct.product_id)[0].quantity - orderProduct.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
