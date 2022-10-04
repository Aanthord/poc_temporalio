import { ethers } from "ethers";
import Logger from "../../config/logger";
import { WalletBcInterface } from "../../entities/WalletInterface/WalletBcInterface";
import { KeyStoreFactory } from "../keystore/KeyStoreFactory";

type WalletT = {
  address?: string;
  privateKey?: string | undefined;
};

export class EVMWallet implements WalletBcInterface {
  address?: string;
  privateKey?: string;

  constructor(props: WalletT) {
    this.address = props?.address;
    this.privateKey = props?.privateKey;
  }

  setWalletId(id: string) {
    this.address = id;
  }

  create() {
    const wallet = ethers.Wallet.createRandom();

    this.privateKey = wallet.privateKey;
    this.address = wallet.address;

    return true;
  }

  async getPrivateKey(keystore = KeyStoreFactory()): Promise<string> {
    if (!this.address) throw new Error("address not set");

    const privateKey = await keystore.get(this.address);

    if (!privateKey) {
      Logger.error("private key was not provided in UserWallet constructor before getPrivateKey was called");
      throw new Error("privateKey has not been provided");
    }

    return privateKey;
  }
}
