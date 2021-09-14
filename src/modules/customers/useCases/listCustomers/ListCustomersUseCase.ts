import { inject, injectable } from 'tsyringe';
import { PaginationAwareObject } from 'typeorm-pagination/dist/helpers/pagination';

import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';

@injectable()
class ListCustomersUseCase {
  constructor(
    @inject('CustomersRepository')
    private readonly customersRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<PaginationAwareObject> {
    const customers = (await this.customersRepository.listCustomers()) as PaginationAwareObject;

    return customers;
  }
}

export default ListCustomersUseCase;
