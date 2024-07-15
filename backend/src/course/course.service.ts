import { Injectable } from '@nestjs/common';
import { ICourse, Course } from '../models/course.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class CourseService {
    constructor(
        @InjectModel('Course') private readonly courseModel: Model<ICourse>,
        private readonly cloudinaryService: CloudinaryService
    ) {}

    async create(courseData: any, filePath: string): Promise<ICourse> {
        try {
            const uploadResponse = await this.cloudinaryService.upload(filePath);
            const newCourse = new this.courseModel({
                ...courseData,
                videoUrl: uploadResponse.url,
            });
            return newCourse.save();
        } catch (error) {
            throw new Error(`Error creating course: ${error.message}`);
        }
    }

    async getAll(): Promise<ICourse[]> {
        try {
            return this.courseModel.find().exec();
        } catch (error) {
            throw new Error(`Error fetching courses: ${error.message}`);
        }
    }

    async get(id: string): Promise<ICourse> {
        try {
            return this.courseModel.findById(id).exec();
        } catch (error) {
            throw new Error(`Error fetching course with id ${id}: ${error.message}`);
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.courseModel.findByIdAndDelete(id).exec();
        } catch (error) {
            throw new Error(`Error deleting course with id ${id}: ${error.message}`);
        }
    }
}
