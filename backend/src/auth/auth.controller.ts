import { Controller, Get, Post, Req, Res, Next, Body } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import userModel, { IUser } from 'src/models/user.model';
import ErrorHandler from 'src/utils/ErrorHandler';
import * as jwt from 'jsonwebtoken';
import sendMail from 'src/utils/sendMail';
import { AuthService } from './auth.service';
require('dotenv').config();

interface IRegisterUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}

interface IActivationRequest {
  activation_token: string;
  activation_code: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async registerUser(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { name, email, password } = req.body;
      const emailExists = await userModel.findOne({ email });
      if (emailExists)
        return next(new ErrorHandler('Email already exists', 400));
      const user: IRegisterUser = { name, email, password };

      const activation_token = this.createActivationToken(user);
      const activation_code = activation_token.activationCode;
      const data = { user: { name: user.name }, activation_code };

      const template = 'activation-mail.ejs'; // Template filename

      try {
        await sendMail({
          email: user.email,
          subject: 'Account Activation',
          template,
          data,
        });
        res.status(201).json({
          success: true,
          message:
            'User registered successfully. Please check your email for activation code.',
          activation_token: activation_token.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }

  createActivationToken(user: IRegisterUser): IActivationToken {
    if (!jwt) {
      console.error('JWT is not imported correctly');
    }
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined in the environment variables');
    }

    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({ user, activationCode }, process.env.JWT_SECRET, {
      expiresIn: '5m',
    });
    return { token, activationCode };
  }

  @Post('activate-user')
  async activateUser(
    @Body() activationRequest: IActivationRequest,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const { activation_token, activation_code } = activationRequest;
      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.JWT_SECRET as string,
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler('Invalid activation code', 400));
      }

      const { name, email, password } = newUser.user;
      const userExists = await userModel.findOne({ email });

      if (userExists) {
        return next(new ErrorHandler('Email already exists', 400));
      }

      const user = await userModel.create({ name, email, password });
      res
        .status(201)
        .json({ success: true, message: 'User activated successfully', user });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }

  @Post('login')
  async loginUser(
    @Body() loginRequest: ILoginRequest,
    @Res() res: Response,
    @Req() req: Request,
    @Next() next: NextFunction,
  ) {
    try {
      const { email, password } = req.body as ILoginRequest;
      if (!email || !password) return next(new ErrorHandler('Please enter email and password', 400));

      const user = await this.authService.validateUser(email, password);
      if (!user) return next(new ErrorHandler('Invalid credentials', 401));

      const token = await this.authService.login(user);
      res.status(200).json({
        status: 'success',
        accessToken: token.access_token,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }

  @Get('logout')
  async logoutUser(@Res() res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({
      status: 'success',
      message: 'Logged out successfully',
    });
  }

  //Update access token

  //Social auth
}
