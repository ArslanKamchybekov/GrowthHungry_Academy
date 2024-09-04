import mongoose, { Schema } from 'mongoose';

export interface IAssignment {
    title: string;
    description: string;
    dueDate: Date;
}

const AssignmentSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
});

export const Assignment = mongoose.model<IAssignment>('Assignment', AssignmentSchema);

