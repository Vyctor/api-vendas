import { injectable } from 'tsyringe';
import { Repository, getRepository } from 'typeorm';

import ICreateCustomerDTO from '@modules/customers/dtos/ICreateCustomerDTO';

import ICustomersRepository from '../../../repositories/ICustomersRepository';
import Customer from '../entities/Customer';

@injectable()
class CustomersRepository implements ICustomersRepository {
  private repository: Repository<Customer>;

  constructor() {
    this.repository = getRepository(Customer);
  }

  create({ name, email }: ICreateCustomerDTO): Customer {
    return this.repository.create({ name, email });
  }

  async save(customer: Customer): Promise<void> {
    await this.repository.save(customer);
  }

  async update(customer: Customer): Promise<Customer> {
    await this.repository.save(customer);
    return customer;
  }

  async showAllCustomers(): Promise<Customer[]> {
    return this.repository.find();
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
}

export default CustomersRepository;
