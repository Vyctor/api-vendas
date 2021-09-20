import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserController from '@modules/users/useCases/CreateUser/CreateUserController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

import ShowAllUsersController from '../../../../modules/users/useCases/ShowAllUsers/ShowAllUsersController';
import UpdateUserAvatarController from '../../../../modules/users/useCases/UpdateUserAvatar/UpdateUseAvatarController';

const usersRouter = Router();
const createUserController = new CreateUserController();
const showAllUsersController = new ShowAllUsersController();
const updateUserAvatarController = new UpdateUserAvatarController();

const uploadMulter = multer(uploadConfig.multer);

usersRouter.get('/', isAuthenticated, showAllUsersController.handle);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  createUserController.handle,
);

usersRouter.patch('/avatar', isAuthenticated, uploadMulter.single('avatar'), updateUserAvatarController.handle);

export default usersRouter;
