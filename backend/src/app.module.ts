import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { MulterModule } from '@nestjs/platform-express';
import { UserController } from './user/user.controller';
import { CourseController } from './course/course.controller';
import { AuthController } from './auth/auth.controller';
import { CloudinaryService } from './course/cloudinary.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from './course/cloudinary.module';
import { CourseService } from './course/course.service';
import { UserService } from './user/user.service';
import { LayoutController } from './layout/layout.controller';
import { LayoutService } from './layout/layout.service';
import { LayoutModule } from './layout/layout.module';
import { AuthService } from './auth/auth.service';
import { AssignmentController } from './assignment/assignment.controller';
import { AssignmentService } from './assignment/assignment.service';
import { AssignmentModule } from './assignment/assignment.module';
import { SubmissionController } from './submission/submission.controller';
import { SubmissionService } from './submission/submission.service';
import { SubmissionModule } from './submission/submission.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      store: require('cache-manager-redis-store'),
      url: process.env.REDIS_URL,
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    UserModule,
    CourseModule,
    LayoutModule,
    CloudinaryModule,
    AssignmentModule,
    SubmissionModule
  ],
  controllers: [AuthController, CourseController, UserController, LayoutController, AssignmentController, SubmissionController],
  providers: [CourseService, UserService, LayoutService, CloudinaryService, AssignmentService, SubmissionService],
  exports: []
})
export class AppModule {}
