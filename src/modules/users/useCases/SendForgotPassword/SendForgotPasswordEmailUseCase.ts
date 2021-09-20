import { resolve } from 'path';
import { inject } from 'tsyringe';

import mail from '@config/mail/mail';
import SESMail from '@config/mail/SESMail';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IMailProvider from '@shared/container/providers/MailProvider/IMailProvider';
import AppError from '@shared/errors/AppError';

class SendForgotPasswordEmailUseCase {
  constructor(
    @inject('EtherealMailProvider')
    private readonly etherealMailProvider: IMailProvider,
    @inject('UsersRepository')
    private readonly usersRepository: IUsersRepository,
    @inject('UserTokensRepository')
    private readonly userTokensRepository: IUserTokensRepository,
  ) {}

  async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const { token } = await this.userTokensRepository.generate(user.id);

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

export default SendForgotPasswordEmailUseCase;
