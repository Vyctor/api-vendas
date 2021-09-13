import { Repository, getRepository } from 'typeorm';

import ICreateCustomer from '@modules/customers/domain/models/ICreateCustomer';
import ICustomer from '@modules/customers/domain/models/ICustomer';

import ICustomersRepository from '../../../domain/repositories/ICustomersRepository';
import Customer from '../entities/Customer';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { name },
    });

    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({ id });

    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: { email },
    });

    return customer;
  }

  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    return this.ormRepository.create({ name, email });
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    return this.ormRepository.save(customer);
  }
}

export default CustomersRepository;
