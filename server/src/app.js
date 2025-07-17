import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import expenseRouter from "./routes/expense.route.js";
import { expenseMigration } from "./migrations/expense.migration.js";

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

// Routes

// temp migrations
// expenseMigration().then(msg => console.log(`rj_ migration = ${msg}`)).catch(err => console.log(`rj_ migration err - ${err}`))

export { app };