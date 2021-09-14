import { injectable } from 'tsyringe';
import { Repository, getRepository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';
import IPaginatedCustomers from '@modules/customers/dtos/IPaginatedCustomers';

import ICustomersRepository from '../../../repositories/ICustomersRepository';
import Customer from '../entities/Customer';

@injectable()
class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = getRepository(Customer);
  }

  async create({ name, email }: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.repository.create({ name, email });
    await this.repository.save(customer);
    return customer;
  }

  async update(customer: Customer): Promise<Customer> {
    await this.repository.save(customer);
    return customer;
  }

  async findByName(name: string): Promise<Customer> {
    return this.repository.findOne({ name });
  }

  async findById(id: string): Promise<Customer> {
    return this.repository.findOne({ id });
  }

  async findByEmail(email: string): Promise<Customer> {
    return this.repository.findOne({ email });
  }

  async deleteById(customerId: string): Promise<void> {
    await this.repository.delete(customerId);
  }

  async listCustomers(): Promise<PaginationAwareObject> {
    return this.repository.createQueryBuilder().paginate();
  }
}

export default CustomersRepository;
