import mongoose from "mongoose";
const { Schema, model } = mongoose;

export interface IWallet {
  address: string;
  tokens?: object[];
  _id: string;
}

const walletSchema = new Schema<IWallet>(
  {
    address: { type: String, required: true },
    tokens: { type: [Object], required: false },
    _id: { type: String, required: true },
  },
  { collection: "Wallets" },
);

export const WalletModel = model<IWallet>("Wallet", walletSchema);
