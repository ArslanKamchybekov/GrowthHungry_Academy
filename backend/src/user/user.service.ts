import { Injectable, Post } from '@nestjs/common';
import UserModel from '../models/user.model';

@Injectable()
export class UserService {
    async getAll() {
        try {
            const users = await UserModel.find().sort({createdAt: -1}).exec();
            return users
        } catch (error) {
            console.log(error)
        }
    }

    async get(id: string) {
        try {
            const user = await UserModel.findById({_id:id}).exec();
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async getByEmail(email: string) {
        try {
            const user = await UserModel.findOne({email: email}).exec();
            return user
        } catch (error) {
            console.log(error)
        }
    }

    async update(id: string, data: any) {
        try {
            return UserModel.findByIdAndUpdate(id, data, { new: true }).exec();
        } catch (error) {
            console.log(error)
        }
    }

    async delete(id: string) {
        try {
            await UserModel.findByIdAndDelete(id).exec();
        } catch (error) {
            console.log(error)
        }
    }

    async updateRole(id: string, role: string) {
        try {
            return UserModel.findByIdAndUpdate(id, { role }, { new: true }).exec();
        } catch (error) {
            console.log(error)
        }
    }

    //get-by-points
    //
}

  