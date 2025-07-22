import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    subTitle: {
      type: String,
      trim: true,
    },
    expense: {
      currency: {
        type: String,
        default: "rupee",
        trim: true
      },
      amount: {
        type: Number,
        required: true,
        trim: true,
      },
    },
    // category: {
    //   type: String,
    //   trim: true,
    //   required: true,
    // },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    date: {
      type: Date,
      default: Date.now()
    },
  },
  {
    timestamps: true,
  }
);

export const Expense = mongoose.model("Expense", expenseSchema);
