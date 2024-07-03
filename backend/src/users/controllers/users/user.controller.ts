import { Controller, Post, Req, Res, Next } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import userModel from 'src/models/user.model';
import ErrorHandler from 'src/utils/ErrorHandler';
import * as jwt from 'jsonwebtoken';  // Correct import statement
import * as ejs from 'ejs';
import * as path from 'path';
import sendMail from 'src/utils/sendMail';
require('dotenv').config();

// Interface for registering a user
interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

// Interface for the activation token
interface IActivationToken {
  token: string;
  activationCode: string;
}

@Controller('users')
export class UserController {
  @Post('register')
  async registerUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const emailExists = await userModel.findOne({ email });
      if (emailExists) return next(new ErrorHandler('Email already exists', 400));
      const user: IRegisterUser = { name, email, password };

      const activation_token = this.createActivationToken(user);
      const activation_code = activation_token.activationCode;
      const data = { user: { name: user.name }, activation_code };  // Ensure the key matches your EJS template

      const templatePath = path.join(__dirname, '../../../mails/activation-mail.ejs');
      const html = await ejs.renderFile(templatePath, data);

      try {
        await sendMail({ email: user.email, subject: "Account Activation", template: html, data: data });
        res.status(201).json({
          success: true,
          message: 'User registered successfully. Please check your email for activation code.',
          activation_token: activation_token.token
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }

  createActivationToken(user: IRegisterUser): IActivationToken {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({ user, activationCode }, process.env.JWT_SECRET, { expiresIn: '5m' });
    return { token, activationCode };
  }
}
