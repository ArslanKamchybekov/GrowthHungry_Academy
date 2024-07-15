import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CloudinaryService } from './cloudinary.service';
import { CourseSchema, CourseDataSchema } from '../models/course.model';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Course', schema: CourseSchema }]),
    ],
    controllers: [CourseController],
    providers: [CourseService, CloudinaryService],
})
export class CourseModule {}

