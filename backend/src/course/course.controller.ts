import { Controller, Get, Post, Delete, Param, Body, UploadedFile, UseInterceptors, UseGuards, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseService } from './course.service';
import { ICourse } from '../models/course.model';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtGuard } from 'src/auth/jwt-auth.guard';

@Controller('course')
@UseGuards(JwtGuard, RolesGuard)
@Roles('admin')
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post('/create')
    //@UseInterceptors(FileInterceptor('thumbnail'))
    async createCourse(@Body() course: ICourse) { // @UploadedFile() thumbnail: Express.Multer.File
        try {
            const createdCourse = await this.courseService.create(course);
            return createdCourse;
        } catch (error) {
            return { error: error.message };
        }
    }

    @Get('/get')
    async getCourses() {
        try {
            const courses = await this.courseService.getAll();
            return courses;
        } catch (error) {
            return { error: error.message };
        }
    }

    @Get(':id')
    async getCourse(@Param('id') id: string) {
        try {
            const course = await this.courseService.get(id);
            return course;
        } catch (error) {
            return { error: error.message };
        }
    }

    @Delete('/delete/:id')
    async deleteCourse(@Param('id') id: string) {
        const deletedCourse = await this.courseService.delete(id);
        return deletedCourse;
    }

    @Put('/update/:id')
    async updateCourse(@Param('id') id: string, @Body() course: ICourse) {
        try {
            const updatedCourse = await this.courseService.update(id, course);
            return updatedCourse;
        } catch (error) {
            return { error: error.message };
        }
    }
}
