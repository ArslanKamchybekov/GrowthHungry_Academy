import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import UserModel from '../models/user.model';
import { redis } from '../utils/redis';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await UserModel.findOne({ email }).select('+password');
    if (user && await user.comparePassword(password)) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(user: any, res: any) {
    const payload = { sub: user._id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1d' });

    try {
      await redis.set(user._id, JSON.stringify(user as any));
      console.log(`User ID saved: ${user._id}`);
    } catch (error) {
      console.error('Error saving session in Redis:', error);
    }

    res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(user: any, res: any) {
    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
    return { access_token: accessToken };
  }

  async logout(user: any, res: any) {
    try {
      res.cookie('access_token', '', { maxAge: 1 });
      res.cookie('refresh_token', '', { maxAge: 1 }); 
      
      console.log(`User ID deleted: ${user}`);
      redis.del(user);
    } catch (error) {
      console.error('Error deleting session in Redis:', error);
    }
  }

  async hashPassword(password: string): Promise<string> { return bcrypt.hash(password, 10) }

}
