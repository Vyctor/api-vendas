import { injectable, inject } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import ICustomersRepository from '../domain/repositories/ICustomersRepository';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}
@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}
  public async execute({ id }: IRequest): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer does not exists!');
    }

    return this.customersRepository.delete(customer);
  }
}

export default DeleteCustomerService;
