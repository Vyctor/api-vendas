import ICreateOrder from '../dtos/ICreateOrderDTO';
import Order from '../infra/typeorm/entities/Order';

interface IOrdersRepository {
  save(order: Order): Promise<void>;
  create({ customer, products }: ICreateOrder): Order;
  findById(id: string): Promise<Order>;
}

export default IOrdersRepository;
