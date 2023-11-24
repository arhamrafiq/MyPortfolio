import mongoose from "mongoose";

const message = new mongoose.Schema(
  {
    email: String,
    message: String,
  },
  { timestamps: true }
);
export default mongoose.model("message", message);
