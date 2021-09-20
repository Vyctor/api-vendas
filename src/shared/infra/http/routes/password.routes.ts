import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';

import ResetPasswordController from '../../../../modules/users/useCases/ResetPassword/ResetPasswordController';
import SendForgotPasswordController from '../../../../modules/users/useCases/SendForgotPassword/ForgotPasswordController';

const passwordRouter = Router();
const sendForgotPasswordController = new SendForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  sendForgotPasswordController.handle,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPasswordController.handle,
);

export default passwordRouter;
