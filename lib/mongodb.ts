import mongoose from "mongoose"

let isConnected = false

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
