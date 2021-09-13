import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import ICreateCustomer from '../models/ICreateCustomer';
import ICustomer from '../models/ICustomer';

export default interface ICustomersRepository {
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  delete(customer: ICustomer): Promise<void>;
  returnPaginated(): Promise<PaginationAwareObject>;
}
