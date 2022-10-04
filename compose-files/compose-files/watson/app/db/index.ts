import { getSecret, DATABASE } from "../config/secrets";
import { connectDB as mongo } from "./mongo/mongo";
import { OptionsT } from "./types/options";
import Logger from "../config/logger";
import { MONGO } from "../config/constants/db/constants";

/*
 Factory is used in case we ever switch to a different db style
*/

export function getDB(options: OptionsT, DB = getSecret(DATABASE)) {
  switch (DB) {
    case MONGO:
      return mongo(options);
    default:
      Logger.warn("[ getDB ]: DATABASE not specified, defaulting to [ MONGO ]");
      return mongo(options);
  }
}
