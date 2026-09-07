import mongoose from "mongoose";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development and serverless invocations in production.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  const isProduction = process.env.NODE_ENV === "production";
  const uri = process.env.MONGODB_URI || (isProduction ? null : "mongodb://127.0.0.1:27017/portfolio");

  if (!uri) {
    if (isProduction) {
      console.warn("MONGODB_URI environment variable is not defined in production. Using code fallbacks.");
    }
    return null;
  }

  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectToDatabase;
