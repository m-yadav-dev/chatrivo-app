import mongoose from "mongoose";
import { ENV_VARS } from "./env.js";
const connectDb = async () => {
  try {
    const uri = ENV_VARS.MONGO_DB_CONN_STR;
    if (!uri) {
      throw new Error("MONGODB_URI is missing in .env file");
    }
    const dbConnection = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${dbConnection.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDb Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
