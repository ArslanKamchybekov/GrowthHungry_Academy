import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CloudinaryService } from './cloudinary.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CourseController],
  providers: [UserService, CourseService, CloudinaryService],
  exports: [UserService, CourseService, CloudinaryService],
})

export class CourseModule {}

