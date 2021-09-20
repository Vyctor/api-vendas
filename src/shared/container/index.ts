import { container } from 'tsyringe';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import CustomersRepository from '../../modules/customers/infra/typeorm/repositories/CustomersRepository';
import ICustomersRepository from '../../modules/customers/repositories/ICustomersRepository';
import OrdersRepository from '../../modules/orders/infra/typeorm/repositories/OrdersRepository';
import ProductsRepository from '../../modules/products/infra/typeorm/repositories/ProductsRepository';
import IProductsRepository from '../../modules/products/repositories/IProductsRepository';
import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);

container.registerSingleton<IOrdersRepository>('OrdersRepository', OrdersRepository);

container.registerSingleton<IProductsRepository>('ProductsRepository', ProductsRepository);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IUserTokensRepository>('UserTokensRepository', UserTokensRepository);
