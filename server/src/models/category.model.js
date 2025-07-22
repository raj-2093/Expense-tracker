import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

export const Category = mongoose.model("Category", categorySchema)
