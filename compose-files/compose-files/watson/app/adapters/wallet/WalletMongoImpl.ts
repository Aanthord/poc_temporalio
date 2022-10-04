import { WalletDbInterface, WalletDbInterfaceT } from "../../entities/WalletInterface/WalletDbInterface"; 
import { WalletModel, IWallet } from "../../dbmodels/WalletModel"; 
import Logger from "../../config/logger";


export class WalletMongoImpl implements WalletDbInterface {
    model: any

    constructor() {
        // Logger.info('[WalletMongoImpl]: constructing')
    }

    async create(userId: string, wallet: any) {
        try {
            await WalletModel.create({
                _id: userId,
                tokens: wallet.tokens,
                address: wallet.address
            });
            return { ok: true, message: '' }
        } catch (error) {
            Logger.error('could not create wallet for user Id: ' + userId);
            return { ok: false, message: 'could not create wallet for user Id: ' + userId};
        }
    }
    
    async save(userId: string, wallet: IWallet): Promise<boolean> {
        const {address, tokens} = wallet;
        
        try {
            await WalletModel.findOneAndUpdate({
                '_id': userId
            },
            {
                _id: userId,
                address,
                tokens,
            });
            return true;
        } catch (exception) {
            Logger.error(exception)
            return false
        }
    };

    async get(userId: string): Promise<WalletMongoImpl> {
        const model = await WalletModel.findById(userId);
        if(!model) throw new Error(`couldn't get wallet from storage based on user Id: ${userId}`);

        this.model = model;

        return this;
    };

    toJSON(wallet: IWallet) {
        return {
            address: wallet.address,
            tokens: wallet.tokens,
            userId: wallet._id
        }
    }

    getWalletId(): string {
        return this.model.address;
    }
}