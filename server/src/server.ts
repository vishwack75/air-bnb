import app from './app';
import { connectDB } from './config/db';
import { config } from './config/env';

const startServer = async () => {
  await connectDB();

  const server = app.listen(config.port, () => {
    console.log(`=================================`);
    console.log(`🚀 Server running on port ${config.port}`);
    console.log(`🌐 Environment: ${config.nodeEnv}`);
    console.log(`🔗 Allowed Client URL: ${config.clientUrl}`);
    console.log(`=================================`);
  });

  const handleShutdown = () => {
    console.log('\nReceived shutdown signal. Closing server...');
    server.close(() => {
      console.log('HTTP Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGINT', handleShutdown);
  process.on('SIGTERM', handleShutdown);
};

startServer();
