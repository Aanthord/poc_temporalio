import { KeyStoreMongoImpl } from "./KeyStoreMongoImpl";


export function KeyStoreFactory() {
    if(process.env.LOCALHOST) {
        return new KeyStoreMongoImpl();
    }
    return new KeyStoreMongoImpl();
}
