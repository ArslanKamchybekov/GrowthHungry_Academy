import mongoose, { Schema } from 'mongoose';
import { IAssignment } from './assignment.model';

export interface ICourseData {
    title: string;
    description: string;
    videoUrl: string;
    assignments: IAssignment[];
}
export interface ICourse {
    name: string;
    description: string;
    prerequisites: string;
    thumbnail: object;
    courseData: ICourseData[];
}
const CourseDataSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String},
    assignments: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }]
});
const CourseSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    prerequisites: { type: String, required: true },
    thumbnail: { 
        public_id: { type: String },
        url: { type: String }
    },
    courseData: { type: [CourseDataSchema], required: true }
});

export const CourseData = mongoose.model<ICourseData>('CourseData', CourseDataSchema);
export const Course = mongoose.model<ICourse>('Course', CourseSchema);