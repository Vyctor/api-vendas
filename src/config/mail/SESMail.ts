import aws from 'aws-sdk';
import nodemailer from 'nodemailer';

import HandlebarsMailTemplate from './HandlebarsMailTemplate';
import mail from './mail';

interface IMailContact {
  name: string;
  email: string;
}

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

class SESMail {
  static async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const handlebarMailTemplate = new HandlebarsMailTemplate();

    const transporter = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
      }),
    });

    const { email, name } = mail.defaults.from;

    await transporter.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await handlebarMailTemplate.parse(templateData),
    });
  }
}

export default SESMail;
