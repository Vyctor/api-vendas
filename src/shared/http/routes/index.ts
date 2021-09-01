import productsRouter from '@modules/products/routes/products.routes';
import { Router } from 'express';

const routes = Router();

// Routes
routes.use('/products', productsRouter);

export default routes;
