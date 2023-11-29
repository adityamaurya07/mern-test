import mongoose from "mongoose";
import { encrypt } from "../module/bcrypt.module.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is requires !"],
  },
  email: {
    type: String,
    required: [true, "Email is requires !"],
    unique: true,
  },
  role: {
    type: String,
    required: [true, "Role is requires !"],
  },
  password: {
    type: String,
    required: [true, "Password is requires !"],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const count = await mongoose
      .model("User")
      .countDocuments({ email: this.email });
    if (count > 0) {
      throw new Error("Email is already registered !");
    }
    next();
  } catch (error) {
    next(error);
  }
});

// //password encriptions
userSchema.pre("save", async function (next) {
  try {
    const pass = this.password.toString();
    const encryptPass = await encrypt(pass);
    this.password = encryptPass;
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("User", userSchema);
