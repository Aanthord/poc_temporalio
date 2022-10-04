import { getSecret, BLOCKCHAIN_SECRET } from "../../config/secrets";
import { FLARE } from "../../config/constants/blockchain/constants";
import { EVMWallet } from "./EVMWallet";
import { WalletBcInterface } from "../../entities/WalletInterface/WalletBcInterface";
import Logger from "../../config/logger";

/*
 Factory is used in case we ever switch to a non EVM compatible chain
*/

export function WalletBcFactory(props?: any, chain = getSecret(BLOCKCHAIN_SECRET)): WalletBcInterface {
  switch (chain) {
    case FLARE:
      Logger.info("EVM walletBcFactory");
      return new EVMWallet(props);
    default:
      Logger.info(
        `[ WalletBcFactory ]: no matching case for blockchain secret [ ${chain} ] defaulting to EVM walletBcFactory, defaulting to [ ${FLARE} ]`,
      );
      return new EVMWallet(props);
  }
}
