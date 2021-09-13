import { getCustomRepository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import OrdersRepository from '../infra/typeorm/repositories/OrderRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order does not exists!');
    }

    return order;
  }
}

export default ShowOrderService;
