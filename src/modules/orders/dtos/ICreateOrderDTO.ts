import Customer from '@modules/customers/infra/typeorm/entities/Customer';

import IProduct from './IProduct';

interface ICreateOrderDTO {
  customer: Customer;
  products: IProduct[];
}

export default ICreateOrderDTO;
