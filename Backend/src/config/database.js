const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'Loaded' : 'Not found');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {

      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log('Database Connected succefully');

    // Event listeners for connection
    mongoose.connection.on('error', (err) => {
      console.error(`MongoDB connection error: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });

    // Handle process termination
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      console.log('MongoDB connection closed due to app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    
    // More detailed error information
    if (error.name === 'MongoParseError') {
      console.error('Issue with MongoDB connection string format');
      console.error('Check your MONGODB_URI in .env file');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('Network or server selection issue');
      console.error('Check your internet connection');
      console.error('Verify your IP is whitelisted in MongoDB Atlas');
    } else if (error.name === 'MongoNetworkError') {
      console.error('Network connectivity issue');
    } else if (error.code === 8000) {
      console.error('Authentication failed');
      console.error('Check your username and password');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;