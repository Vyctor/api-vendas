import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarUseCase from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const user = await updateUserAvatarUseCase.execute({
      userId: request.user.id,
      avatarFilename: request.file?.filename as string,
    });

    return response.json(classToClass(user));
  }
}

export default UpdateUserAvatarController;
