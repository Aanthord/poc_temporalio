import mongoose from "mongoose";
import { getSecret } from "../../config/secrets";
import { CONN_STRING } from "../../config/constants/db/constants";
import { OptionsT, LOG_LEVEL } from "../types/options";
import Logger from "../../config/logger";
import { MongoMemoryServer } from "mongodb-memory-server";
import { ENV_NAME } from "../../config/constants/environments/env";

let mongod: MongoMemoryServer | null = null;

export const connectDB = async (options: OptionsT = { logLevel: LOG_LEVEL.LOW }) => {
  try {
    let connString = getSecret(CONN_STRING);

    if (process.env.NODE_ENV === ENV_NAME.TEST) {
      console.log("using test db connection string");
      const envString = getSecret("TEST_CONN_STRING");
      if (envString) connString = envString;
    }
    if (!connString) throw new Error("[ db ]: no CONN_STRING defined in env");
    mongoose.connect(connString);

    const connection = mongoose.connection;

    connection.once("open", function () {
      Logger.info("[ db ]: mongodb connected");
    });
  } catch (err) {
    Logger.error("[ db ]: Could not connect to mongodb, error thrown in mongo.ts");
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    if (mongod) {
      await mongod.stop();
    }
  } catch (err) {
    Logger.error("[ db ]: error on disconnectDB");
    Logger.error(err);
  }
};
