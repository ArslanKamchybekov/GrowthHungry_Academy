import { Injectable } from '@nestjs/common';
import UserModel from '../models/user.model';

@Injectable()
export class UserService {
  async getUser(id: string) {
    return UserModel.findById(id);
  }
}
