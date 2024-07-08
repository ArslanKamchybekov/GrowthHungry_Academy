import mongoose, { Schema, Document } from 'mongoose';
export interface ICourseData {
    title: string;
    description: string;
    videoUrl: string;
    videoLength: number;
}
export interface ICourse {
    name: string;
    description: string;
    prerequisites: string;
}
const CourseDataSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    videoLength: { type: Number, required: true }
});
const CourseSchema: Schema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    prerequisites: { type: String, required: true }
});

export interface ICourseDataModel extends ICourseData, Document {}

export interface ICourseModel extends ICourse, Document {}

export const CourseData = mongoose.model<ICourseDataModel>('CourseData', CourseDataSchema);
export const Course = mongoose.model<ICourseModel>('Course', CourseSchema);