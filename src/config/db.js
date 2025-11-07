import mongoose from 'mongoose';

// Cache the connection to reuse in serverless environment
let cachedConnection = null;

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    // eslint-disable-next-line no-console
    console.error('Missing MONGODB_URI in environment');
    // In serverless, don't exit process, just throw error
    if (process.env.VERCEL) {
      throw new Error('Missing MONGODB_URI in environment');
    }
    process.exit(1);
  }

  // Reuse existing connection in serverless environment
  if (cachedConnection && mongoose.connection.readyState === 1) {
    // eslint-disable-next-line no-console
    console.log('Using cached MongoDB connection');
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    cachedConnection = connection;
    // eslint-disable-next-line no-console
    console.log('MongoDB connected (Koa)');
    return connection;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Mongo connection error:', err.message);
    // In serverless, don't exit process, just throw error
    if (process.env.VERCEL) {
      throw err;
    }
    process.exit(1);
  }
}

export default connectDB;


