import Logger from "../../config/logger";
import { getSecret, TALENTPAIR_ACCOUNT_ID, TALENTPAIR_PRIVATE_KEY } from "../../config/secrets";
import { ethers } from "ethers";
import { EVMClient } from "./EVMClient";
import { ENV_NAME } from "../../config/constants/environments/env";
export class FlareClient extends EVMClient {
  privateKey;
  wallet;
  client;
  address;

  constructor() {
    super();
    const { privateKey } = this.getKeys();

    this.privateKey = privateKey;

    this.client = new ethers.providers.JsonRpcProvider(this.getNetwork());

    this.wallet = new ethers.Wallet(privateKey, this.client);

    this.wallet.connect(this.client);
    this.address = this.wallet.address;
  }

  getWalletId() {
    return this.wallet.address;
  }

  getNetwork(): string {
    switch (process.env.NODE_ENV) {
      case ENV_NAME.GOJIRA:
      case ENV_NAME.STAGING:
        return "https://coston-api.flare.network/ext/bc/C/rpc";
      case ENV_NAME.LOCAL:
        return "http://blockchain:8545";
      case ENV_NAME.TEST:
        return "http://127.0.0.1:8545";
      default:
        Logger.warn(
          `[ FlareClient ]: unrecognized NODE_ENV [ ${process.env.NODE_ENV} ] defaulting to [ ${ENV_NAME.GOJIRA} ]`,
        );
        return "https://coston-api.flare.network/ext/bc/C/rpc";
    }
  }

  async sign() {
    if (!this.privateKey) {
      Logger.error("privateKey not found when signing transaction");
      throw new Error("privateKey not found");
    }
  }

  getKeys() {
    let accountId = getSecret(TALENTPAIR_ACCOUNT_ID);
    let privateKey = getSecret(TALENTPAIR_PRIVATE_KEY);

    if (process.env.NODE_ENV === ENV_NAME.GOJIRA) {
      // gojira aws secret manager key:
      // gojira/staging/COSTON_PRIVATE_KEY
      privateKey = getSecret("COSTON_PRIVATE_KEY");
    } else if (process.env.NODE_ENV === "test") {
      privateKey = getSecret("HARDHAT_PRIVATE_KEY");
    }
    // production aws secret manager key:
    // production/FLARE_PRIVATE_KEY

    // If we weren't able to grab it, we should throw a new error
    if (accountId == null || privateKey == null) {
      throw new Error("secrets accountId and privateKey must be present");
    }
    return { accountId, privateKey };
  }
}
