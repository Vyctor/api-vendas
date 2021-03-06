import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailUseCase from './SendForgotPasswordEmailUseCase';

class SendForgotPasswordController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmaiUseCase = container.resolve(SendForgotPasswordEmailUseCase);

    await sendForgotPasswordEmaiUseCase.execute(email);

    return response.status(204).json();
  }
}

export default SendForgotPasswordController;
