import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import UserModel from '../models/user.model';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
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
      await this.cacheManager.set(user._id, refreshToken, 24 * 60 * 60 );
      console.log(`User ID saved: ${user._id}`);
    } catch (error) {
      console.error('Error saving session in Redis:', error);
    }

    // Set cookies
    res.cookie('access_token', accessToken, { httpOnly: true, secure: true });
    res.cookie('refresh_token', refreshToken, { httpOnly: true, secure: true });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refreshToken(user: any, res: any) {
    const cachedRefreshToken = await this.cacheManager.get<string>(user._id);
    if (!cachedRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { username: user.username, sub: user._id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    // Set new access token cookie
    res.cookie('access_token', accessToken, { httpOnly: true, secure: true });

    return {
      access_token: accessToken,
    };
  }

  async logout(user: any, res: any) {
    try {
      await this.cacheManager.del(user._id);
      console.log(`User ID deleted: ${user._id}`);

      res.clearCookie('access_token');
      res.clearCookie('refresh_token');
    } catch (error) {
      console.error('Error deleting session in Redis:', error);
    }
  }
}
