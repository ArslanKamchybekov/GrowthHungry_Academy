import { Injectable } from '@nestjs/common';
import { Assignment } from 'src/models/assignment.model';
import { SubmissionService } from 'src/submission/submission.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AssignmentService {
    constructor(
        private readonly userService: UserService,
        private readonly submissionService: SubmissionService
    ) {}

    async getAll() {
        const assignments = await Assignment.find().sort({ createdAt: -1 }).exec();
        return assignments;
    }

    async getById(id: string) {
        const assignment = await Assignment.findById(id).exec();
        return assignment;
    }

    async create(assignmentData: any) {
        const assignment = new Assignment(assignmentData);
        await assignment.save();
        return assignment;
    }

    async update(id: string, assignmentData: any) {
        const assignment = await Assignment.findByIdAndUpdate(id, assignmentData, { new: true });
        return assignment;
    }

    async delete(id: string) {
        const assignment = await Assignment.findByIdAndDelete(id);
        return assignment;
    }

    async submit(assignmentId: string, userId: string, submissionText: string, currentTime: Date) {
        try {
            const user = await this.userService.get(userId);
            if (!user) return { message: 'User not found' };
            user.submissions.push({submissionId: assignmentId});
            user.points += 10;
            await user.save();

            const submission = await this.submissionService.create({
                assignmentId,
                userId,
                submissionText,
                submittedAt: currentTime
            });

            return submission;
        } catch (error: any) {
            return { message: error.message };
        }
    }
}
