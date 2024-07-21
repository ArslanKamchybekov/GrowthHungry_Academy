import { Controller, Get, Post, Put, Delete, Param, Body, Res, Next, HttpStatus, UseGuards } from '@nestjs/common';
import userModel, { IUser } from 'src/models/user.model';
import ErrorHandler from 'src/utils/ErrorHandler';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
<<<<<<< HEAD
import { Request, Response, Router } from 'express';
    import { userService } from './user.service';
   
=======
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
>>>>>>> origin/main

@Controller('user')
export class UserController {
    
    // Controller function to get all users
   .get('/get-users', async (req: Request, res: Response) => {
        try {
            const users = await userService.getAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving users', error });
        }
    });
    
    // Controller function to get a specific user by ID
    router.get('/get-user/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const user = await userService.get(id);
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving user', error });
        }
    });
    
    // Controller function to delete a user by ID
    router.delete('/delete-user/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const result = await userService.delete(id);
            if (result) {
                res.json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting user', error });
        }
    });
    
    // OPTIONAL: Controller function to update a user
    router.put('/update-user/:id', async (req: Request, res: Response) => {
        const { id } = req.params;
        const userData: Partial<User> = req.body;
        try {
            const updatedUser = await userService.update(id, userData);
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating user', error });
        }
    });
    
    export default router;

<<<<<<< HEAD
=======
    @Get()
    @UseGuards(RolesGuard)
    @Roles('admin')
    async getUsers(@Res() res) {
        try {
            const users = await userModel.find();
            return res.status(HttpStatus.OK).json(users);
        } catch (error) {
            return new ErrorHandler(res, error);
        }
    }

    @Get(':id')
    @UseGuards(JwtGuard)
    async getUser(@Res() res, @Param('id') id: string) {
        try {
            const user = await userModel.findById(id);
            return res.status(HttpStatus.OK).json(user);
        } catch (error) {
            return new ErrorHandler(res, error);
        }
    }

}
>>>>>>> origin/main
