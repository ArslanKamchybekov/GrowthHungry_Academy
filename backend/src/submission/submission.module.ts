import { Module } from '@nestjs/common';
import { SubmissionController } from './submission.controller';
import { SubmissionService } from './submission.service';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [SubmissionController],
  providers: [SubmissionService, UserService],
  exports: [SubmissionService],
})

export class SubmissionModule {}

