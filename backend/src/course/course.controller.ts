import { Controller, Get, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

@Controller('course')
export class CourseController {

    @Get()
    @UseGuards(JwtGuard, RolesGuard)
    @Roles('admin')
    getCourses() {
        return 'All courses';
    }
}
