import { injectable, inject } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class DeleteCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer does not exists!');
    }

    return this.customersRepository.deleteById(id);
  }
}

export default DeleteCustomerUseCase;
