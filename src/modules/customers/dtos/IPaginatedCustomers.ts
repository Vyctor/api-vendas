import Customer from '../infra/typeorm/entities/Customer';

interface IPaginatedCustomers {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number | null;
  next_page: number | null;
  data: Customer[];
}

export default IPaginatedCustomers;
