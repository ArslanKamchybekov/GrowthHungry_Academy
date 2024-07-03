import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middleware/error';

export const app = express();
require('dotenv').config();

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(ErrorMiddleware);
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  }),
);
