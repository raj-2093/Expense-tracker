import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { createExpenses, deleteAllExpenses } from "./migrations/expense.migration.js";

dotenv.config({
  path: ".env",
});

console.log("Env file check ----- ", process.env.PORT);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening at PORT: ${process.env.PORT}`);
    });

    // UTILS
    // createExpenses().then(res => console.log(`rj_ all expenses created ${res}`))
    // deleteAllExpenses().then(res => console.log(`rj_ all expenses deleted ${res}`)).catch(err => console.log(`rj_ deleteAllExpenses - err - ${err}`))
  })
  .catch((err) => {
    console.error("MONGODB connection ERROR: ", err);
  });