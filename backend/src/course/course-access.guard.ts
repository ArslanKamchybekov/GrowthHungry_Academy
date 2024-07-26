import { Injectable } from "@nestjs/common";
import { CanActivate } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { CourseService } from "./course.service";
import { UserService } from "../user/user.service";

@Injectable()
export class CourseAccessGuard implements CanActivate {
    constructor(
        private readonly courseService: CourseService, 
        private readonly userService: UserService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        
        const user = request.user;
        const courseId = request.params.id;
        console.log(courseId);

        const course = await this.courseService.get(courseId);
        const userEntity = await this.userService.get(user.userId);

        if (!course || !userEntity) return false;

        console.log(userEntity.courses);

        return userEntity.courses.some(courseId => course._id.toString() === course.id);
    }
}