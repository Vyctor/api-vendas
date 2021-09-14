import { inject } from 'tsyringe';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found!');
    }

    const customerUpdateEmail = await this.customersRepository.findByEmail(email);

    if (customerUpdateEmail && customerUpdateEmail.email !== email) {
      throw new AppError('There is already a user using this e-mail.');
    }

    customer.name = name;
    customer.email = email;

    return this.customersRepository.update(customer);
  }
}

export default UpdateCustomerUseCase;
