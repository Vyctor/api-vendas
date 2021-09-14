import { container } from 'tsyringe';

import CustomersRepository from '../../modules/customers/infra/typeorm/repositories/CustomersRepository';
import ICustomersRepository from '../../modules/customers/repositories/ICustomersRepository';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);
