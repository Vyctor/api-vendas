import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import CreateSessionController from '../../../../modules/users/useCases/CreateSession/CreateSessionController';

const sessionsRouter = Router();
const createSessionController = new CreateSessionController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  createSessionController.handle,
);

export default sessionsRouter;
