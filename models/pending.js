import mongoose from "mongoose";

const pending = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    Phone: {
      type: String,
      require: true,
    },
    Code: {
      type: String,
      require: true,
    },
    Created: Date,
    Expires: Date,
  },
  { timestamps: true }
);

pending.index({ createdAt: 1 }, { expireAfterSeconds: 1200 });

export default mongoose.model("pending", pending);
