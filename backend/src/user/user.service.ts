import { Injectable } from '@nestjs/common';
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

    async enroll(id: string, courseId: string) {
        try {
            return UserModel.findByIdAndUpdate(id, { $push: { courses: courseId } }, { new: true }).exec();
        } catch (error) {
            console.log(error)
        }
    }

    async unenroll(id: string, courseId: string) {
        try {
            return UserModel.findByIdAndUpdate(id, { $pull: { courses: courseId } }, { new: true }).exec();
        } catch (error) {
            console.log(error)
        }
    }

    async getByPoints(){
        try {
            const users = await UserModel.find().sort({points: -1}).exec();
            return users
        } catch (error) {
            console.log(error)
        }
    }

    async promote(id: string) {
        try {
            return UserModel.findByIdAndUpdate(id, { role: 'admin' }, { new: true }).exec();
        } catch (error) {
            console.log(error)
        }
    }

    async demote(id: string) {
        try {
            return UserModel.findByIdAndUpdate(id, { role: 'user' }, { new: true }).exec();
        } catch (error) {
            console.log(error)
        }
    }

    async isEnrolled(id: string, courseId: string) {
        try {
            const user = await UserModel.findById(id).exec();
            return user.courses.includes({ courseId: courseId });
        } catch (error) {
            console.log(error)
        }
    }
}

  