import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Customer;
  save(customer: Customer): Promise<void>;
  update(data: ICreateCustomerDTO): Promise<Customer>;
  showAllCustomers(): Promise<Customer[]>;
  findByName(name: string): Promise<Customer>;
  findById(id: string): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
  deleteById(id: string): Promise<void>;
}

export default ICustomersRepository;
