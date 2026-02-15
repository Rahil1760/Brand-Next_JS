import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const connectMongoDB = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }

  try {
    const mongoUri = process.env.MONGODB_URI 
    // || "mongodb+srv://Rahil:Rahil@cluster0.i3gvz.mongodb.net/brand?retryWrites=true&w=majority&appName=Cluster0";
    if (!mongoUri) {
      throw new Error('MongoDB connection string (MONGODB_URI) is not defined in environment variables.');
    }
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message);
      throw error;
    } else {
      console.error('Unknown error connecting to MongoDB:', error);
      throw new Error('An unknown error occurred while connecting to MongoDB');
    }
  }
};

export default connectMongoDB;