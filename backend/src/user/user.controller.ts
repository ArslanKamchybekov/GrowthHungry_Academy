import { Controller, Req, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import UserModel from 'src/models/user.model';
import type { IUser } from 'src/models/user.model';
import { UserService } from './user.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtGuard, RolesGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}
    
    @Get('/get')
    async getUsers() { 
        try {
            const users = await this.userService.getAll();
            return users;
        } catch (error: any) {
            return { error: error.message };
        }
    }

    @Get('/me')
    async getMe(@Req() req: any) { 
        try {
            return req.user;
        } catch (error: any) {
            return { error: error.message };
        }
    }
      

    @Get(':id')
    async getUser(@Param ('id')id:string) { 
        try {
            return UserModel.findById(id).exec();
        } catch (error: any) {
            return { error: error.message };
        }
    }

    @Delete('/delete/:id')
    @Roles('admin')
    async deleteUser(@Param ('id')id:string) { 
        try {
            this.userService.delete(id);
        } catch (error: any) {
            return { error: error.message };
        }
    }

   @Put('/update/:id')
   async updateUser(@Param ('id')id:string, @Body ()user: IUser) { 
        try {
            const updatedUser = await this.userService.update(id, user);
            return updatedUser;
        } catch (error: any) {
            return { error: error.message };
        }
    }

    @Post('/enroll/:id')
    async enrollUser(@Param ('id')id: string, @Body() _id: string) { 
        try {
            const enrolledUser = await this.userService.enroll(id, _id);
            return enrolledUser;
        } catch (error: any) {
            return { error: error.message };
        }
    }

    @Post('/unenroll/:id')
    async unenrollUser(@Param ('id')id: string, @Body() _id: string) { 
        try {
            const unenrolledUser = await this.userService.unenroll(id, _id);
            return unenrolledUser;
        } catch (error: any) {
            return { error: error.message };
        }
    }

    @Get('/points/get')
    async getPoints() { 
        try {
            const users = await this.userService.getByPoints();
            return users;
        } catch (error: any) {
            return { error: error.message };
        }
    }

    @Post('/promote/:id')
    @Roles('admin')
    async promoteUser(@Param ('id')id: string) { 
        try {
            const promotedUser = await this.userService.promote(id);
            if(!promotedUser) return { error: 'User not found' };
            promotedUser.save();
            return promotedUser;
        } catch (error: any) {
            return { error: error.message };
        }
    }

    @Post('/demote/:id')
    @Roles('admin')
    async demoteUser(@Param ('id')id: string) {
        try {
            const demotedUser = await this.userService.demote(id);
            if(!demotedUser) return { error: 'User not found' };
            demotedUser.save();
            return demotedUser;
        } catch (error: any) {
            return { error: error.message };
        }
    }
}





