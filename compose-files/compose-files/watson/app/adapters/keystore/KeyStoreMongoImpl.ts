import { KeyStoreInterface } from "../../entities/KeyStoreInterface/KeyStoreInterface";
import { PrivateKeyModel } from "../../dbmodels/PrivateKeyModel";
import Logger from "../../config/logger";

export class KeyStoreMongoImpl implements KeyStoreInterface {
    constructor() {
        Logger.info('[KeyStoreMongoImpl]: constructing')
    }
    
    async save(userId: string, key: string): Promise<boolean> {
        try {
            const pk = new PrivateKeyModel({
                _id: userId,
                privateKey: key
            });
            pk.save();
            return true;
        } catch (exception) {
            Logger.error(exception)
            return false
        }
    };

    async get(userId: string): Promise<string> {
        const pk = await PrivateKeyModel.findById(userId);
        if(!pk) throw new Error(`couldn't get key from storage based on user Id: ${userId}`);
        
        return pk.privateKey;
    };
}