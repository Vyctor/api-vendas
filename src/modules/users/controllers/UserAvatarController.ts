import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { classToClass } from 'class-transformer';

class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      userId: request.user.id,
      avatarFilename: request.file?.filename as string,
    });

    return response.json(classToClass(user));
  }
}

export default UserAvatarController;
