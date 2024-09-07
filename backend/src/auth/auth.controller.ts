import { Controller, Get, Post, Req, Res, Body, UseGuards, Next } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import userModel, { IUser } from 'src/models/user.model';
import ErrorHandler from 'src/utils/ErrorHandler';
import * as jwt from 'jsonwebtoken';
import sendMail from 'src/utils/sendMail';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './refresh-jwt-auth.guard';
import { JwtGuard } from './jwt-auth.guard';
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

interface ILogoutRequest {
  userId: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async registerUser(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const emailExists = await userModel.findOne({ email });
      if (emailExists)
        return next(new ErrorHandler('Email already exists', 400));
      const user: IRegisterUser = { name, email, password };

      const activation_token = this.createActivationToken(user);
      const activation_code = activation_token.activationCode;
      const activationLink = `http://localhost:3000/activate?token=${activation_token.token}&code=${activation_code}`;
      const template = 'activation-mail.ejs';

      try {
        console.log('Sending email to:', user.email); // Debugging line
        await sendMail({
          email: user.email,
          subject: 'Account Activation',
          template,
          data: { activationLink },
        });
        res.status(201).json({
          success: true,
          message: 'User registered successfully. Please check your email for activation code.',
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
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({ user, activationCode }, process.env.JWT_SECRET as string, {
      expiresIn: '5m',
    });
    return { token, activationCode };
  }

  createResetToken(user: IUser): string {
    return jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  }

  @Post('activate-user')
  async activateUser(@Body() activationRequest: IActivationRequest, @Res() res: Response, @Next() next: NextFunction) {
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
      res.status(201).json({ success: true, message: 'User activated successfully', user });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }

  @Post('login')
  async loginUser(@Res() res: Response, @Req() req: Request, @Next() next: NextFunction) {
    try {
      const { email, password } = req.body as ILoginRequest;
      if (!email || !password) return next(new ErrorHandler('Please enter email and password', 400));

      const user = await this.authService.validateUser(email, password);
      if (!user) return next(new ErrorHandler('Invalid credentials', 401));

      const token = await this.authService.login(user, res);
      res.status(200).json({ status: 'success', user, token: token.access_token, refresh_token: token.refresh_token });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    await this.authService.refreshToken(req.user, res);
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  async logoutUser(@Req() req: Request & { user: ILogoutRequest }, @Res() res: Response, @Next() next: NextFunction) {
    try {
      if (!req.user || !req.user.userId) throw new Error('User not authenticated');
      const userId = req.user.userId.toString();
      
      await this.authService.logout(userId, res); // Pass the userId as a string
      res.status(200).json({ success: true, message: 'User logged out successfully' });
    } catch (error: any) {
      console.error('Error during logout:', error); // Debugging line
      return next(new ErrorHandler(error.message, 400));
    }
  }

  @Post('forgot-password')
  async forgotPassword(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({email});
      if (!user) return next(new ErrorHandler('User not found', 404));

      const resetToken = this.createResetToken(user);
      const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
      const template = 'reset-password.ejs';

      try {
        await sendMail({
          email: user.email,
          subject: 'Reset Password',
          template,
          data: { resetLink },
        });
        res.status(200).json({
          success: true,
          message: 'Reset password link sent to email',
          resetToken,
        });
      }catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }

  @Post('reset-password')
  async resetPassword(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const { password } = req.body;
      const resetToken = req.headers.authorization; // Headers:  Authorization , NO BEARER, just token
      if (!resetToken) return next(new ErrorHandler('Invalid token', 400));

      const decoded = jwt.verify(resetToken, process.env.JWT_SECRET as string) as { userId: string };
      const user = await userModel.findById(decoded.userId);
      if (!user) return next(new ErrorHandler('User not found', 404));

      user.password = password;
      await user.save();
      res.status(200).json({ success: true, message: 'Password reset successfully'});
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
}