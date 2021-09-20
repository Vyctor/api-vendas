import { Router } from 'express';

import customersRouter from './customers.routes';
import ordersRouter from './orders.routes';
import passwordRouter from './password.routes';
import productsRouter from './products.routes';
import profileRouter from './profile.routes';
import sessionsRouter from './sessions.routes';
import usersRouter from './users.routes';

const routes = Router();

// Routes
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', ordersRouter);

export default routes;
