import { WalletModel } from "../../dbmodels/WalletModel";

export async function getWalletInfo(userId: string) {
    // query the db. We don't want to go to the chain unless we absolutely have to, it will be expensive
    return WalletModel.findById(userId)
}
