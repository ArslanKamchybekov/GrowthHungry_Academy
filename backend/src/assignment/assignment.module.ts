import { Module } from '@nestjs/common';
import { AssignmentController } from './assignment.controller';
import { AssignmentService } from './assignment.service';
import { UserService } from 'src/user/user.service';
import { SubmissionService } from 'src/submission/submission.service';

@Module({
  controllers: [AssignmentController],
  providers: [AssignmentService, UserService, SubmissionService],
  exports: [AssignmentService],
})

export class AssignmentModule {}

