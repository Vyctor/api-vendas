import { resolve } from 'path';
import { inject } from 'tsyringe';
import { getCustomRepository } from 'typeorm';

import mail from '@config/mail/mail';
import SESMail from '@config/mail/SESMail';
import AppError from '@shared/errors/AppError';

import IMailProvider from '../../../shared/container/providers/MailProvider/IMailProvider';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import UserTokensRepository from '../infra/typeorm/repositories/UserTokensRepository';

class SendForgotPasswordEmailService {
  constructor(
    @inject('EtherealMailProvider')
    private readonly etherealMailProvider: IMailProvider,
  ) {}

  async execute(email: string): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const { token } = await userTokensRepository.generate(user.id);

    const forgotPasswordTemplate = resolve(__dirname, '..', 'views', 'ForgotPassword.hbs');

    if (mail.driver === 'ses') {
      await SESMail.sendMail({
        to: {
          name: user.name,
          email: user.email,
        },
        subject: '[API VENDAS] Recuperação de senha',
        templateData: {
          file: forgotPasswordTemplate,
          variables: {
            name: user.name,
            link: `${process.env.APP_WEB_URL}:${process.env.APP_WEB_PORT}/reset_password?token=${token}`,
          },
        },
      });
    } else {
      const variables = {
        name: user.name,
        link: `${process.env.APP_WEB_URL}:${process.env.APP_WEB_PORT}/reset_password?token=${token}`,
      };

      await this.etherealMailProvider.sendMail(email, '[API VENDAS] Recuperação de senha', variables, forgotPasswordTemplate);
    }
  }
}

export default SendForgotPasswordEmailService;
