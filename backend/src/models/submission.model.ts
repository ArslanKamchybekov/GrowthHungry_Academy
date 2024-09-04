import { Schema, model } from 'mongoose';

export interface ISubmission {
    assignmentId: string;
    userId: string;
    title: string;
    submissionText: string;
    submittedAt: Date;
    feedback: string;
}

const SubmissionSchema = new Schema({
    assignmentId: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    submissionText: { type: String, required: true },
    submittedAt: { type: Date, required: true },
    feedback: { type: String, required: false },
});

export const Submission = model<ISubmission>('Submission', SubmissionSchema);