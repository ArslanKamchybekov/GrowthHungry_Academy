import { Controller, Get, Post, Delete, Param, Body, UploadedFile, UseInterceptors, UseGuards, Put } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseService } from './course.service';
import { ICourse } from '../models/course.model';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { redis } from 'src/utils/redis';
import { CourseAccessGuard } from './course-access.guard';

@Controller('course')
@UseGuards(JwtGuard, RolesGuard)
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Roles('admin')
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
            const cachedCourses = await redis.get('courses');
            if (cachedCourses) return JSON.parse(cachedCourses);
            else{
                const courses = await this.courseService.getAll();
                await redis.set('courses', JSON.stringify(courses));
                return courses;
            }
        } catch (error) {
            return { error: error.message };
        }
    }

    @Get(':id')
    async getCourse(@Param('id') id: string) {
        try {
            const course_id = id;
            const cachedCourse = await redis.get(course_id);
            if (cachedCourse) return JSON.parse(cachedCourse);
            else{
                const course = await this.courseService.get(id);
                await redis.set(course_id, JSON.stringify(course));
                return course;
            }
        } catch (error) {
            return { error: error.message };
        }
    }

    @UseGuards(CourseAccessGuard)
    @Get('/content/:id')
    async getCourseContent(@Param('id') id: string) {
        try {
            console.log("Id: ", id )
            const course = await this.courseService.getContent(id);
            console.log("Course: ", course)
            return course;
        } catch (error) {
            return { error: error.message };
        }
    }

    @Roles('admin')
    @Delete('/delete/:id')
    async deleteCourse(@Param('id') id: string) {
        const deletedCourse = await this.courseService.delete(id);
        return deletedCourse;
    }

    @Roles('admin')
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
