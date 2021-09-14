import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';
import { injectable } from 'tsyringe';

import IMailProvider from '../IMailProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        });
        this.client = transporter;
      })
      .catch((error) => {
        throw new Error(`Failed to send mail: ${error.message}`);
      });
  }

  async sendMail(to: string, subject: string, variables: unknown, path: string): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const mail = await this.client.sendMail({
      to,
      from: 'API Vendas <suporte@apivendas.com.br>',
      subject,
      html: templateHTML,
    });

    console.log('mail: ', mail);
  }
}

export default EtherealMailProvider;
