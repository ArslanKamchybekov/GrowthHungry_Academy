import { Injectable } from '@nestjs/common';
import { Course } from '../models/course.model';
import { CloudinaryService } from './cloudinary.service';
import UserModel from '../models/user.model';

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
            return Course.find().exec();
        } catch (error) {
            throw new Error(`Error fetching courses: ${error.message}`);
        }
    }

    async get(id: string) {
        try {
            return Course.findById(id).select('-courseData.videoUrl').exec();
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

    // async markChapterAsCompleted(courseId: string, chapterId: string, userId: string) {
    //     try {
    //         const course = await Course.findById(courseId).exec();
    //         const user = await UserModel.findById(userId).exec();
    //         if (!course || !user) throw new Error('Course or user not found');
            
    //         const chapter = course.courseData.find(chapter => chapter._id == chapterId);
    //         if (!chapter) throw new Error('Chapter not found');

    //         if(!user.completedCourses.some(course => course.courseId == courseId)){
    //             user.completedCourses.push({ courseId });
    //             user.points += 10;
    //         }

    //         return user.save();
    //     } catch (error) {
    //         throw new Error(`Error marking chapter as completed: ${error.message}`);
    //     }
    // }
}
