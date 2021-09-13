import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('User not found!');
    }

    const customerUpdateEmail = await customersRepository.findByEmail(email);

    if (customerUpdateEmail && customerUpdateEmail.email !== email) {
      throw new AppError('There is already a user using this e-mail.');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
