import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import connectDB from './utils/database';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    credentials: true,
  });

  await app.listen(process.env.PORT);
  
  console.log(`Server running on http://localhost:${process.env.PORT}`);
  
  await connectDB();
}
bootstrap();
