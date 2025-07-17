import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      "DB connected successfully: ",
      connectionInstance.connection.host
    );
  } catch (err) {
    console.error("MongoDB connection FAILED: ", err);
    process.exit(1);
  }
};

export default connectDB;