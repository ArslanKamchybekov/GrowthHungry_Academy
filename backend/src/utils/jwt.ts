
import { Response } from 'express';
import { IUser } from 'src/models/user.model';

export interface ITokenOptions {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: boolean | 'lax' | 'strict' | 'none';
    secure?: boolean;
}
    export const sendToken = (user: IUser, statusCode: number, res: Response) =>{
        const accessToken = user.SignAccessToken();
        const refreshToken = user.SignRefreshToken();
      
        const accessTokenOptions: ITokenOptions = {
            expires: new Date(Date.now() + parseInt(process.env.ACCESS_TOKEN_EXPIRE) * 60 * 1000),
          maxAge: parseInt(process.env.ACCESS_TOKEN_EXPIRE) * 60 * 1000,
          httpOnly: true,
          sameSite: 'none', // Adjust according to your requirements
          secure: process.env.NODE_ENV === 'production', // Secure cookie in production
        };
      
        const refreshTokenOptions: ITokenOptions = {
        expires: new Date(Date.now() + parseInt(process.env.REFRESH_TOKEN_EXPIRE) * 24 * 60 * 60 * 1000),
        maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRE) * 24 * 60 * 60 * 1000,
          httpOnly: true,
          sameSite: 'none',
          secure: process.env.NODE_ENV === 'production',
        };
      
        // Setting cookies
        res.cookie('accessToken', accessToken, accessTokenOptions);
        res.cookie('refreshToken', refreshToken, refreshTokenOptions);
      
        // Sending response
        res.status(statusCode).json({
          status: 'success',
          accessToken,
          user,
        });
      }
