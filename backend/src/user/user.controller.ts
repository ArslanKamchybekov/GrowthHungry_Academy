import { Controller, Get, Post, Put, Delete, Param, Body, Res, Next, HttpStatus, UseGuards } from '@nestjs/common';
import userModel, { IUser } from 'src/models/user.model';
import ErrorHandler from 'src/utils/ErrorHandler';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { Request, Response } from 'express';
import { UserService } from './user.service';

   

@Controller('user')
export class UserController {
    
  constructor(private readonly userService : UserService){}
    @Post('/create')
    async createUser(@Body() user: IUser) { 
        try {
            const newUser = await this.userService.createPost(user);
            return newUser;
        } catch (error) {
            return { error: error.message };
        }
    }

    @Get('/get')
    async getUsers(@Body() user: IUser) { 
        try {
            const users = await this.userService.getPosts();
            return users;
        } catch (error) {
            return { error: error.message };
        }
    }
    @Get(':id')
    async getUser(@Param ('id')id:string) { 
        try {
            const user = await this.userService.getPost(id);
            return user;
        } catch (error) {
            return { error: error.message };
        }
    }
    @Delete('/delete/:id')
    async deleteUser(@Param ('id')id:string) { 
        try {
        this.userService.deletePost(id);
        } catch (error) {
            return { error: error.message };
        }
    }

   @Put('/update/:id')
   async updateUser(@Param ('id')id:string, @Body ()user: IUser) { 
    try {
        const updatedUser = await this.userService.updatePost(id, user);
        return updatedUser;
    } catch (error) {
        return { error: error.message };
    }
}
}





