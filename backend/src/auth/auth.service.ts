import { Injectable, Inject } from '@nestjs/common';
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

  async login(user: any) {
    const payload = { username: user.username, sub: user._id };
    const token = this.jwtService.sign(payload);

    try {
      await this.cacheManager.set("hi", "there");
      console.log(`User ID saved: ${user._id}`);
    } catch (error) {
      console.error('Error saving session in Redis:', error);
    }
    return {
      access_token: token,
    };
  }
}
