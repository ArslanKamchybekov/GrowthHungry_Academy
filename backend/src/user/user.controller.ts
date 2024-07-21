import { Controller, Get, Post, Put, Delete, Param, Body, Res, Next, HttpStatus, UseGuards } from '@nestjs/common';
import userModel, { IUser } from 'src/models/user.model';
import ErrorHandler from 'src/utils/ErrorHandler';
import { JwtGuard } from 'src/auth/jwt-auth.guard';
import { Request, Response, Router } from 'express';
    import { userService } from './user.service';
   

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

