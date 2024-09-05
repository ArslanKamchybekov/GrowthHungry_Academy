import mongoose, { set } from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || '')
    console.log('MongoDB connected');
  } catch (error: any) {
    console.error(error.message);
    setTimeout(connectDB, 5000);
  }
};

export default connectDB;
