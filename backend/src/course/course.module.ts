import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [CourseController],
  providers: [UserService],
  exports: [UserService],
})
export class CourseModule {}
