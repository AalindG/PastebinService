import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  apiKey: { type: String, required: true },
  isActive: { type: Boolean, required: true, default: true },
  lastUsed: { type: Date, default: '' },
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

export default User
