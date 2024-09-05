import { Controller, Get, Post, Delete, Param, Body, UploadedFile, UseInterceptors, UseGuards, Put, Req } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { AssignmentService } from './assignment.service';
import { UserService } from '../user/user.service';

@Controller('assignment')
@UseGuards(JwtGuard, RolesGuard)
export class AssignmentController {
    constructor(
        private readonly assignmentService: AssignmentService,
        private readonly userService: UserService
    ) {}
    
    @Post('create')
    async create(@Body() assignmentData: any) {
        return this.assignmentService.create(assignmentData);
    }
    
    @Get('get')
    async getAll() {
        return this.assignmentService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.assignmentService.getById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() assignmentData: any) {
        return this.assignmentService.update(id, assignmentData);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.assignmentService.delete(id);
    }

    @Post('submit/:id')
    async submit(
        @Param('id') assignmentId: string,
        @Body('submissionText') submissionText: string,
        @Req() req: any
    ) {
        const userId = req.user.userId;
        try {
            const assignment = await this.assignmentService.getById(assignmentId);
            if (!assignment) return { message: 'Assignment not found' };

            const user = await this.userService.get(userId);
            if (!user) return { message: 'User not found' };

            const currentTime = new Date();
            if (currentTime > assignment.dueDate) { throw new Error('Assignment is past due date'); }

            return this.assignmentService.submit(assignmentId, userId, submissionText, currentTime);
        } catch (error) {
            console.log(error);   
        }
    }
}
