import * as nodeMailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import * as ejs from 'ejs';
import * as path from 'path';
require('dotenv').config();

interface EmailOptions {
  email: string;
  subject: string;
  template: string;
  data: { [key: string]: any };
}

const renderFileAsync = (filePath: string, data: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(filePath, data, (err, str) => {
      if (err) return reject(err);
      resolve(str);
    });
  });
};

const sendMail = async (options: EmailOptions): Promise<void> => {
  const transporter: Transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const { email, subject, template, data } = options;

  try {
    const templatePath = path.join(__dirname, '../mails', template);
    const html: string = await renderFileAsync(templatePath, data);

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendMail;
