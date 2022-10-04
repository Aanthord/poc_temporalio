/*
Interface to allow injection of different methods for wallets
*/
export interface WalletBcInterface {
  address?: string;
  privateKey?: string;

  create(): boolean;

  setWalletId(id: string): void;
}
