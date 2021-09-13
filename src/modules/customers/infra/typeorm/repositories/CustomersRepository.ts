import { injectable } from 'tsyringe';
import { Repository, getRepository } from 'typeorm';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import ICreateCustomer from '@modules/customers/domain/models/ICreateCustomer';
import ICustomer from '@modules/customers/domain/models/ICustomer';

import ICustomersRepository from '../../../domain/repositories/ICustomersRepository';
import Customer from '../entities/Customer';

@injectable()
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
    const user = this.ormRepository.create({ name, email });
    await this.ormRepository.save(user);
    return user;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    const user = await this.ormRepository.save(customer);
    return user;
  }

  public async delete(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async returnPaginated(): Promise<PaginationAwareObject> {
    return this.ormRepository.createQueryBuilder().paginate();
  }
}

export default CustomersRepository;
