import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error('MongoDB URI is not defined.');
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    setTimeout(connectDB, 5000); // Retry connection after 5 seconds
  }
};

export default connectDB;