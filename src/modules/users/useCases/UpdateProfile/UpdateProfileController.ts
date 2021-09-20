import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileUseCase from './UpdateProfileUseCase';

class UpdateProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const { name, email, password, old_password } = request.body;

    const updateProfileUseCase = container.resolve(UpdateProfileUseCase);

    const user = await updateProfileUseCase.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(classToClass(user));
  }
}

export default UpdateProfileController;
