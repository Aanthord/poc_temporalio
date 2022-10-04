/*
Interface to allow injection of different methods for wallets
*/

export type WalletDbInterfaceT = {
    address: string,
    _id: string,
    tokens: any[],
};

export interface WalletDbInterface {
    // accountId: string;
    // _id: string;
    // tokens: any[];

    save(userId: string, wallet: any): Promise<boolean>;
    get(userId: string): Promise<any>;

    getWalletId(): string;
}