import { inject, injectable } from 'tsyringe';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import AppError from '@shared/errors/AppError';

import ICreateCustomerDTO from '../../dtos/ICreateCustomerDTO';
import Customer from '../../infra/typeorm/entities/Customer';

@injectable()
class CreateCustomerUseCase {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    const emailAlreadyInUse = await this.customersRepository.findByEmail(email);

    if (emailAlreadyInUse) {
      throw new AppError('E-mail address already exists in our database!');
    }

    const customer = this.customersRepository.create({
      name,
      email,
    });

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default CreateCustomerUseCase;
