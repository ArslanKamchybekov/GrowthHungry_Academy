import { Controller, Get, Post, Put, Delete, Param, Body, Res, Next, HttpStatus, UseGuards } from '@nestjs/common';
import userModel, { IUser } from 'src/models/user.model';
import ErrorHandler from 'src/utils/ErrorHandler';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

interface IUpdateUser {
    name?: string;
    email?: string;
}

@Controller('user')
export class UserController {

    @UseGuards(JwtGuard)
    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res, @Next() next) {
        try {
            const user = await userModel.findById(id);
            res.status(201).json(user);
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
    
    @Put(':id')
    async update(@Param('id') id: string, @Body() user: IUpdateUser, @Res() res, @Next() next) {
        try {
            await userModel.findByIdAndUpdate(id, user);
            res.status(201).json(user);
        } catch (error: any) {
            return next(new ErrorHandler(error.message, 400));
        }
    }
}
