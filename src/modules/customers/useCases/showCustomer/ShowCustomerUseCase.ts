import { inject, injectable } from 'tsyringe';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

@injectable()
class ShowCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found!');
    }

    return customer;
  }
}

export default ShowCustomerUseCase;
