import Logger from "../../config/logger";
import { getSecret, TALENTPAIR_ACCOUNT_ID, TALENTPAIR_PRIVATE_KEY } from "../../config/secrets";
import { ethers } from "ethers";

export class EVMClient {
  privateKey;
  wallet;
  client;
  address;

  constructor() {
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
    if (process.env.LOCALHOST) {
      // return "http://localhost:10002";
      return "https://coston-api.flare.network/ext/bc/C/rpc";
    }
    return "http://localhost:10002";
  }

  async sign() {
    if (!this.privateKey) {
      Logger.error("privateKey not found when signing transaction");
      throw new Error("privateKey not found");
    }
  }

  getKeys() {
    const accountId = getSecret(TALENTPAIR_ACCOUNT_ID);
    const privateKey = getSecret(TALENTPAIR_PRIVATE_KEY);

    // If we weren't able to grab it, we should throw a new error
    if (accountId == null || privateKey == null) {
      throw new Error("secrets accountId and privateKey must be present");
    }
    return { accountId, privateKey };
  }
}
