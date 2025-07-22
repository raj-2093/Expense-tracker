import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import expenseRouter from "./routes/expense.route.js";
import categoryRouter from "./routes/category.route.js"
import { createExpenses, deleteAllExpenses, expenseMigration } from "./migrations/expense.migration.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config({
  path: ".env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes

app.use("/api/v1/user", userRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/category", categoryRouter);

// Routes

export { app };