import { Controller, Get, Post, Put, Delete, Param, Body, Res, Next, HttpStatus, UseGuards } from '@nestjs/common';
import userModel, { IUser } from 'src/models/user.model';
import ErrorHandler from 'src/utils/ErrorHandler';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('user')
export class UserController {

    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin')
    async getUsers(@Res() res) {
        try {
            const users = await userModel.find();
            return res.status(HttpStatus.OK).json(users);
        } catch (error) {
            return new ErrorHandler(res, error);
        }
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async getUser(@Res() res, @Param('id') id: string) {
        try {
            const user = await userModel.findById(id);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return new ErrorHandler(res, error);
        }
    }

}
