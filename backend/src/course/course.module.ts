import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { CloudinaryModule } from './cloudinary.module';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CourseController],
  imports: [CloudinaryModule],
  providers: [CourseService, UserService]
})

export class CourseModule {}

