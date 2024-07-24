import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import UserModel, { IUser } from 'src/models/user.model';
import { UserService } from './user.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService){}
    
    @Get('/get')
    async getUsers(@Body() user: IUser) { 
        try {
            const users = await this.userService.getAll();
            return users;
        } catch (error) {
            return { error: error.message };
        }
    }

    @Get(':id')
    async getUser(@Param ('id')id:string) { 
        try {
            return UserModel.findById(id).exec();
        } catch (error) {
            return { error: error.message };
        }
    }

    @Delete('/delete/:id')
    async deleteUser(@Param ('id')id:string) { 
        try {
            this.userService.delete(id);
        } catch (error) {
            return { error: error.message };
        }
    }

   @Put('/update/:id')
   async updateUser(@Param ('id')id:string, @Body ()user: IUser) { 
        try {
            const updatedUser = await this.userService.update(id, user);
            return updatedUser;
        } catch (error) {
            return { error: error.message };
        }
    }
}





