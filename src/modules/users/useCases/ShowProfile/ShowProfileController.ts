import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProfileUseCase from './ShowProfileUseCase';

class ProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileUseCase = container.resolve(ShowProfileUseCase);

    const user = await showProfileUseCase.execute(user_id);

    return response.json(classToClass(user));
  }
}

export default ProfileController;
