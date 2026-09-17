import { server } from "./src/library/socket.js";
import "./src/app.js";
import connectDb from "./src/library/db.js";
import dotenv from "dotenv";

import { ENV_VARS } from "./src/library/env.js";
dotenv.config();

const PORT = ENV_VARS.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb();
    server.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} in ${ENV_VARS.NODE_ENV || "development"} mode`,
      );
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

startServer();
