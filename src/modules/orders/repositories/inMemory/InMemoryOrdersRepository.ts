import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

class InMemoryOrdersRepository implements IOrdersRepository {
  private orders: Array<Order> = [];

  async findById(id: string): Promise<Order> {
    return this.orders.find((order) => order.id === id);
  }
  async createOrder({ customer, products }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, {
      customer,
      products,
    });

    this.orders.push(order);

    return order;
  }
}

export default InMemoryOrdersRepository;
