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
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    UserModule,
    CourseModule,
  ],
  controllers: [CourseController, AuthController, UserController],
  providers: [CloudinaryService],
})
export class AppModule {}
