import { inject, injectable } from 'tsyringe';

import ICustomer from '@modules/customers/domain/models/ICustomer';
import AppError from '@shared/errors/AppError';

import ICreateCustomer from '../domain/models/ICreateCustomer';
import ICustomersRepository from '../domain/repositories/ICustomersRepository';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailAlreadyExists = await this.customersRepository.findByEmail(email);

    if (emailAlreadyExists) {
      throw new AppError('E-mail address already exists in our database!');
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
