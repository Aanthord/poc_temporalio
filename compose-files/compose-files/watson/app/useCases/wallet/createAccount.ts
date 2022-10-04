import { KeyStoreFactory } from "../../adapters/keystore/KeyStoreFactory";
import { WalletBcFactory } from "../../adapters/wallet/WalletBcFactory";
import { WalletDbFactory } from "../../adapters/wallet/WalletDbFactory";

type DbInterfaceResponse = {
  ok: boolean;
  message: string | undefined;
  data?: any;
};

export async function createAccount(
  userId: string,
  keyStore = KeyStoreFactory(),
  walletBc = WalletBcFactory(),
  walletDbFactory = WalletDbFactory,
): Promise<DbInterfaceResponse> {
  const dbModel = walletDbFactory();

  walletBc.create();

  if (!walletBc.address) throw new Error(`unable to get address for wallet with address`);
  if (!walletBc.privateKey) throw new Error(`unable to get private key for wallet with address: ${walletBc.address}`);

  // save the account to the database
  const wallet = {
    _id: userId,
    address: walletBc.address,
  };
  const res: DbInterfaceResponse = await dbModel.create(userId, wallet);
  if (res.ok) {
    // save the private key to injected storage
    await keyStore.save(userId, walletBc.privateKey);

    return { ok: true, message: "success", data: { address: walletBc.address } };
  } else {
    return { ok: false, message: `couldn't create wallet for user id ${userId}. may already exist.` };
  }
}
