import { getSecret, BLOCKCHAIN_SECRET } from "../../config/secrets";
import { FLARE } from "../../config/constants/blockchain/constants";
import Logger from "../../config/logger";
import { EVMClient } from "./EVMClient";
import { FlareClient } from "./FlareClient";

export function TalentpairClientFactory(blockchain = getSecret(BLOCKCHAIN_SECRET)) {
  switch (blockchain) {
    case FLARE:
      return new FlareClient();
    default:
      Logger.warn(`[TP client]: blockchain secret [ ${blockchain} ] did not match a case, defaulting to: ${FLARE}`);
      return new EVMClient();
  }
}
