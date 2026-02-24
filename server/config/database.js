const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    logger.error('Error connecting to MongoDB: MONGODB_URI is not set. Copy server/env.example to server/.env and set MONGODB_URI (e.g. mongodb://localhost:27017/hackers-paradise).');
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    const host = conn.connection?.host || conn.connection?.name || 'MongoDB';
    logger.info(`MongoDB Connected: ${host}`);

    // Handle connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    const msg = error.reason?.message ?? error.message ?? error.toString?.() ?? String(error);
    logger.error('Error connecting to MongoDB: ' + msg);
    if (error.reason && error.reason.message !== msg) logger.error('Reason: ' + (error.reason.message || error.reason));
    if (error.stack) logger.error(error.stack);
    process.exit(1);
  }
};

module.exports = connectDB; 