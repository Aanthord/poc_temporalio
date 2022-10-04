import { getSecret, BLOCKCHAIN_SECRET } from "../../config/secrets";
import { FLARE } from "../../config/constants/blockchain/constants";
import Logger from "../../config/logger";
import { GrowthPartnerNFT } from "./GrowthPartnerNFT";

export type GrowPartnerNFTT = {
  s3: string;
  external: string;
  hash_value: string;
  fow_specialties: string[];
  growth_partner_uuid: string;
  agency_id: number;
};

/*
 Factory is used in case we ever switch to a non EVM compatible chain
*/

export async function GPNFTFactory(props: GrowPartnerNFTT, blockchain = getSecret(BLOCKCHAIN_SECRET)) {
  switch (blockchain) {
    case FLARE:
      const flare = new GrowthPartnerNFT(props);
      return flare.setup();
    default:
      Logger.warn(`[ GPNFTFactory ]: blockchain secret [ ${blockchain} ] was not found, defaulting to: [ ${FLARE} ]`);
      const def = new GrowthPartnerNFT(props);
      return def.setup();
  }
}
