import mongoose, { mongo } from "mongoose";

const OrderScehma = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      required: true,
    },
    Pages: {
      type: Number,
    },
    pageNames: {
      type: String,
    },
    funtionalities: {
      type: String,
    },
    Hosting: {
      type: Number,
      default: 0,
    },
    referenceWeb: {
      type: String,
    },
    status: {
      type: String,
      default: "Not Processed",
    },
    days: {
      type: Number,
    },
    charges: {
      type: String,
      default: "N/A",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderScehma);
