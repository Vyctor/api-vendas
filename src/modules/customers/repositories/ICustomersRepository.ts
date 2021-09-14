import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import IPaginatedCustomers from '@modules/customers/dtos/IPaginatedCustomers';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import ICreateCustomerDTO from '../dtos/ICreateCustomerDTO';

interface ICustomersRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  update(data: ICreateCustomerDTO): Promise<Customer>;
  findByName(name: string): Promise<Customer>;
  findById(id: string): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
  deleteById(customerId: string): Promise<void>;
  listCustomers(): Promise<PaginationAwareObject | IPaginatedCustomers>;
}

export default ICustomersRepository;
