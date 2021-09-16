import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import CreateProductController from '../../../../modules/products/useCases/CreateProduct/CreateProductController';
import DeleteProductController from '../../../../modules/products/useCases/DeleteProduct/DeleteProductController';
import ListProductController from '../../../../modules/products/useCases/ListProduct/ListProductController';
import ShowProductController from '../../../../modules/products/useCases/ShowProduct/ShowProductController';
import UpdateProductController from '../../../../modules/products/useCases/UpdateProduct/UpdateProductController';

const productsRouter = Router();

const createProductControler = new CreateProductController();
const deleteProductController = new DeleteProductController();
const listProductController = new ListProductController();
const showProductController = new ShowProductController();
const updateProductController = new UpdateProductController();

productsRouter.get('/', listProductController.handle);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required },
  }),
  showProductController.handle,
);

productsRouter.post(
  '/',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  createProductControler.handle,
);

productsRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  updateProductController.handle,
);

productsRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required },
  }),
  deleteProductController.handle,
);

export default productsRouter;
