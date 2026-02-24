const app = require('./app');
const connectDB = require('./config/database');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 2000;

// Connect to MongoDB, then start server
const startServer = async () => {
  await connectDB();
  const server = app.listen(PORT, () => {
    logger.info(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    logger.error(`Error: ${err.message}`);
    server.close(() => process.exit(1));
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    logger.error(`Error: ${err.message}`);
    logger.error('Shutting down the server due to uncaught exception');
    process.exit(1);
  });

  return server;
};

const serverPromise = startServer().catch((err) => {
  logger.error('Failed to start server:', err.message);
  process.exit(1);
});

module.exports = serverPromise; 