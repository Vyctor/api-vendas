import { Request, Response } from 'express';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ListAllCustomersService from '@modules/customers/services/ListAllCustomersService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';

class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListAllCustomersService();

    const customers = await listCustomers.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerService = new ShowCustomerService();

    const customer = await showCustomerService.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.execute({
      name,
      email,
    });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomerService = new UpdateCustomerService();

    const updatedCustomer = await updateCustomerService.execute({
      id,
      name,
      email,
    });

    return response.json(updatedCustomer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomerService = new DeleteCustomerService();

    await deleteCustomerService.execute({ id });

    return response.send();
  }
}

export default CustomerController;
