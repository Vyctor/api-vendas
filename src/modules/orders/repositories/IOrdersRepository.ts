import ICreateOrder from '../dtos/ICreateOrderDTO';
import Order from '../infra/typeorm/entities/Order';

interface IOrdersRepository {
  findById(id: string): Promise<Order>;
  createOrder({ customer, products }: ICreateOrder): Promise<Order>;
}

export default IOrdersRepository;
