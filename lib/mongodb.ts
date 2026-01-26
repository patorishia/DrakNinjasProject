import mongoose from "mongoose"

let isConnected = false


/**
 * Establishes (or reuses) a MongoDB connection using Mongoose.
 *
 * ## Behavior
 * - Reuses an existing connection if available (for hot reload in dev).
 * - Otherwise, creates a new connection and caches it globally.
 *
 * ## Environment
 * - Requires `MONGODB_URI` to be defined in environment variables.
 *
 * ## Usage
 * - Call `await connectDB()` before any DB operation.
 * - Safe to call multiple times — it will not open multiple connections.
 *
 * @throws Error if `MONGODB_URI` is not defined.
 * @returns Promise<typeof mongoose>
 */


export async function connectDB(): Promise<void> {
  if (isConnected) return

  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("MONGODB_URI is missing in .env.local")
  }

  try {
    const db = await mongoose.connect(uri)
    isConnected = db.connections[0].readyState === 1
    console.log("MongoDB connected")
  } catch (error) {
    console.error("MongoDB connection error:", error)
    throw error
  }
}
