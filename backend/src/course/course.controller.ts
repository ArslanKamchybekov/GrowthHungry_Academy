import { Controller, Get, Post, Delete, Param, Body, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseService } from './course.service';
import { JwtGuard } from '../auth/jwt.guard'; // Ensure you have JWT guard implemented
import { ICourse } from '../models/course.model';

@Controller('course')
@UseGuards(JwtGuard)
export class CourseController {
    constructor(private readonly courseService: CourseService) {}

    @Post('/create-course')
    @UseInterceptors(FileInterceptor('file'))
    async createCourse(@Body() courseData: ICourse, @UploadedFile() file: Express.Multer.File) {
        try {
            const filePath = file.path;
            const createdCourse = await this.courseService.create(courseData, filePath);
            return createdCourse;
        } catch (error) {
            return { error: error.message };
        }
    }

    @Get('/get-courses')
    async getCourses() {
        try {
            const courses = await this.courseService.getAll();
            return courses;
        } catch (error) {
            return { error: error.message };
        }
    }

    @Get('/get-course/:id')
    async getCourse(@Param('id') id: string) {
        try {
            const course = await this.courseService.get(id);
            return course;
        } catch (error) {
            return { error: error.message };
        }
    }

    @Delete('/delete-course/:id')
    async deleteCourse(@Param('id') id: string) {
        try {
            const course = await this.courseService.get(id);
            if (course.videoUrl) {
                const publicId = this.extractPublicId(course.videoUrl);
                await this.courseService.delete(id);
                await this.cloudinaryService.delete(publicId);
            }
            return { message: 'Course deleted successfully' };
        } catch (error) {
            return { error: error.message };
        }
    }

    // Helper function to extract public ID from Cloudinary URL
    private extractPublicId(url: string): string {
        const parts = url.split('/');
        const publicId = parts[parts.length - 1].split('.')[0];
        return publicId;
    }
}
