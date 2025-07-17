import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
  path: ".env",
});

console.log("Env file check ----- ", process.env.PORT);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is listening at PORT: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MONGODB connection ERROR: ", err);
  });