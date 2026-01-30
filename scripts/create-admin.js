import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI;

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function createAdmin() {
  await mongoose.connect(MONGODB_URI);

  const email = "admin@admin.com";
  const password = "admin123";

  const hashed = await bcrypt.hash(password, 10);

  await User.create({
    email,
    password: hashed,
    role: "admin",
  });

  console.log("Admin criado com sucesso!");
  process.exit(0);
}

createAdmin();
