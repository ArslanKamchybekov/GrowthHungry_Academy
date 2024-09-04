import { Injectable } from '@nestjs/common';
import { Submission } from 'src/models/submission.model';

@Injectable()
export class SubmissionService {
    constructor() {}

    async getAll() {
        const submissions = await Submission.find().sort({ createdAt: -1 }).exec();
        return submissions;
    }

    async getById(id: string) {
        const submission = await Submission.findById(id).exec();
        return submission;
    }

    async create(submissionData: any) {
        const submission = new Submission(submissionData);
        await submission.save();
        return submission;
    }

    async update(id: string, submissionData: any) {
        const submission = await Submission.findByIdAndUpdate(id, submissionData, { new: true });
        return submission;
    }

    async delete(id: string) {
        const submission = await Submission.findByIdAndDelete(id);
        return submission;
    }
}
