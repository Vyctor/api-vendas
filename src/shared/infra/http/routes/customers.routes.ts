import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import CreateCustomerController from '@modules/customers/useCases/createCustomer/CreateCustomerController';
import DeleteCustomerController from '@modules/customers/useCases/deleteCustomer/DeleteCustomerController';
import ListCustomersController from '@modules/customers/useCases/listCustomers/ListCustomersController';
import ShowCustomerController from '@modules/customers/useCases/showCustomer/ShowCustomerController';
import UpdateCustomerController from '@modules/customers/useCases/updateCustomer/UpdateCustomerController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const customersRouter = Router();

customersRouter.use(isAuthenticated);

const createCustomerController = new CreateCustomerController();
const deleteCustomerController = new DeleteCustomerController();
const listCustomersController = new ListCustomersController();
const showCustomerController = new ShowCustomerController();
const updateCustomerController = new UpdateCustomerController();

customersRouter.get('/', listCustomersController.handle);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  showCustomerController.handle,
);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  createCustomerController.handle,
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  updateCustomerController.handle,
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  deleteCustomerController.handle,
);

export default customersRouter;
