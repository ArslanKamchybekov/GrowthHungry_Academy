import { Injectable } from '@nestjs/common';
import { Course } from '../models/course.model';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class CourseService {
    constructor(
        private readonly cloudinaryService: CloudinaryService
    ) {}

    async create(courseData: any) {
        try {
            const course = new Course(courseData);
            return course.save();
        } catch (error) {
            throw new Error(`Error creating course: ${error.message}`);
        }
    }

    async getAll() {
        try {
            return Course.find().select('-courseData.videoUrl').exec();
        } catch (error) {
            throw new Error(`Error fetching courses: ${error.message}`);
        }
    }

    async get(id: string) {
        try {
            return Course.findById(id).select('-courseData.videoUrl ').exec();
        } catch (error) {
            throw new Error(`Error fetching course with id ${id}: ${error.message}`);
        }
    }

    async getContent(id: string){
        try {
            return Course.findById(id).exec();
        } catch (error) {
            throw new Error(`Error fetching course with id ${id}: ${error.message}`);
        }
    }

    async delete(id: string) {
        try {
            await Course.findByIdAndDelete(id).exec();
            //this.cloudinaryService.delete(id);
        } catch (error) {
            throw new Error(`Error deleting course with id ${id}: ${error.message}`);
        }
    }

    async update(id: string, courseData: any) {
        try {
            return Course.findByIdAndUpdate(id, courseData, { new: true }).exec();
        } catch (error) {
            throw new Error(`Error updating course with id ${id}: ${error.message}`);
        }   
    } 
}
