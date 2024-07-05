import { Controller, Get, Post, Put, Delete, Param, Body, Res, Next, HttpStatus } from '@nestjs/common';
import userModel, { IUser } from 'src/models/user.model'; 

@Controller('user')
export class UserController {

    @Get(':id')
    async findOne(@Param('id') id: string, @Res() res, @Next() next) {
        const user = await userModel.findById(id);
        res.status(201).json(user);
    }
    
}
