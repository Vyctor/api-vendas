import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

import CreateOrderController from '../../../../modules/orders/useCases/CreateOrder/CreateOrderController';
import ShowOrderController from '../../../../modules/orders/useCases/ShowOrder/ShowOrderController';

const ordersRouter = Router();

const createOrderController = new CreateOrderController();
const showOrderController = new ShowOrderController();

ordersRouter.use(isAuthenticated);

ordersRouter.get(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
    },
  }),
  showOrderController.handle,
);

ordersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),
      products: Joi.required(),
    },
  }),
  createOrderController.handle,
);

export default ordersRouter;
