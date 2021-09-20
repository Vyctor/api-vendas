import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordUseCase from './ResetPasswordUseCase';

class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { password, token } = request.body;

    const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);

    await resetPasswordUseCase.execute({ password, token });

    return response.status(204).json();
  }
}

export default ResetPasswordController;
