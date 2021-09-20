import { inject, injectable } from 'tsyringe';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class ShowOrderUseCase {
  constructor(
    @inject('OrdersRepository')
    private readonly ordersRepository: IOrdersRepository,
  ) {}

  async execute(id: string): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order does not exists!');
    }

    return order;
  }
}

export default ShowOrderUseCase;
