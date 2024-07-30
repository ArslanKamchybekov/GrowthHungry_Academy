import { Module } from '@nestjs/common';
import { LayoutController } from './layout.controller';
import { LayoutService } from './layout.service';
import { UserService } from '../user/user.service';
import { CloudinaryModule } from 'src/course/cloudinary.module';

@Module({
  controllers: [LayoutController],
  imports: [CloudinaryModule],
  providers: [LayoutService, UserService],
})

export class LayoutModule {}
