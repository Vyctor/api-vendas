import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';

import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

import ShowProfileController from '../../../../modules/users/useCases/ShowProfile/ShowProfileController';
import UpdateProfileController from '../../../../modules/users/useCases/UpdateProfile/UpdateProfileController';

const profileRouter = Router();
const showProfileController = new ShowProfileController();
const updateProfileController = new UpdateProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', showProfileController.handle);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string().valid(Joi.ref('password')).when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
    },
  }),
  updateProfileController.handle,
);

export default profileRouter;
