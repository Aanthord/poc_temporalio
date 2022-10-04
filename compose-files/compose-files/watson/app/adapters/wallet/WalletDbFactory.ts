import { WalletMongoImpl } from "./WalletMongoImpl";
import { getSecret, DATABASE } from "../../config/secrets";
import { MONGO } from "../../config/constants/db/constants";

export function WalletDbFactory(dbType = getSecret(DATABASE)) {
    switch(dbType){
        case MONGO:
            return new WalletMongoImpl();
        default:
            return new WalletMongoImpl();
    }
}
