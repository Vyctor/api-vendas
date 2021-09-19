import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';

import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileService = new ShowProfileService();

    const user = await showProfileService.execute({ user_id });

    return response.json(classToClass(user));
  }
}

export default ProfileController;
