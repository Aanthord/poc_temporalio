import { ConfigStoreMongoImpl } from "./ConfigStoreMongoImpl";


export function ConfigStoreFactory() {
    if(process.env.LOCALHOST) {
        return new ConfigStoreMongoImpl();
    }
    return new ConfigStoreMongoImpl();
}
