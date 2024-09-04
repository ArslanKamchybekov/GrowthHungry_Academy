import { Controller, Get, Post, Delete, Param, Body, UploadedFile, UseInterceptors, UseGuards, Put, Patch } from '@nestjs/common';
import { RolesGuard } from '../auth/roles.guard';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { SubmissionService } from './submission.service';

@Controller('submission')
@UseGuards(JwtGuard, RolesGuard)
export class SubmissionController {
    constructor(
        private readonly submissionService: SubmissionService
    ) {}

    @Post('create')
    async create(@Body() submissionData: any) {
        return this.submissionService.create(submissionData);
    }

    @Get('get')
    async getAll() {
        return this.submissionService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return this.submissionService.getById(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() submissionData: any) {
        return this.submissionService.update(id, submissionData);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return this.submissionService.delete(id);
    }

    @Get('user/:userId')
    async getByUserId(@Param('userId') userId: string) {
        return this.submissionService.getByUserId(userId);
    }
}
