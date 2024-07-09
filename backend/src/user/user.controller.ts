import { Controller, Get, Post, Put, Delete, Param, Body, Res, Next, HttpStatus, UseGuards } from '@nestjs/common';
import userModel, { IUser } from 'src/models/user.model';
import ErrorHandler from 'src/utils/ErrorHandler';
import { JwtGuard } from 'src/auth/jwt-auth.guard';


@Controller('user')
export class UserController {

}
