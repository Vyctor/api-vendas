import { injectable } from 'tsyringe';
import { Repository, getRepository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

import ICreateOrder from '../../../dtos/ICreateOrderDTO';
import Order from '../entities/Order';

@injectable()
class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  async findById(id: string): Promise<Order> {
    const order = this.repository.findOne(id, {
      relations: ['order_products', 'customer'],
    });

    return order;
  }

  public async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.repository.create({
      customer,
      order_products: products,
    });

    await this.repository.save(order);

    return order;
  }
}

export default OrdersRepository;
