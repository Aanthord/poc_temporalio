/*
Interface to allow injection of different storage methods for private keys
*/
export interface KeyStoreInterface {
    save(userId: string, key: string): Promise<boolean>;
    get(userId: string): Promise<string>;
}