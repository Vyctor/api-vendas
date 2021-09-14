import ICreateCustomer from '@modules/customers/dtos/ICreateCustomerDTO';
import IPaginatedCustomers from '@modules/customers/dtos/IPaginatedCustomers';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import ICustomersRepository from '../ICustomersRepository';

class InMemoryCustomersRepository implements ICustomersRepository {
  customers: Array<Customer> = [];

  async create(data: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    Object.assign(customer, {
      data,
    });

    this.customers.push(customer);

    return customer;
  }

  async update(customerData: Customer): Promise<Customer> {
    const index = this.customers.findIndex((customer) => customer.id === customerData.id);

    this.customers[index] = customerData;

    return customerData;
  }

  async findByName(name: string): Promise<Customer> {
    return this.customers.find((customer) => customer.name === name);
  }

  async findById(id: string): Promise<Customer> {
    return this.customers.find((customer) => customer.id === id);
  }

  async findByEmail(email: string): Promise<Customer> {
    return this.customers.find((customer) => customer.email === email);
  }

  async deleteById(customerId: string): Promise<void> {
    this.customers.filter((customer) => customer.id !== customerId);
  }

  async listCustomers(): Promise<IPaginatedCustomers> {
    return {
      from: 0,
      to: 0,
      per_page: this.customers.length,
      total: this.customers.length,
      current_page: 1,
      prev_page: null,
      next_page: null,
      data: this.customers,
    };
  }
}

export default InMemoryCustomersRepository;
