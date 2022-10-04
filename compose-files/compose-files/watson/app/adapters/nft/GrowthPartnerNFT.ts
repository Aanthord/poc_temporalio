import { ethers } from "ethers";
import Logger from "../../config/logger";
import { TalentpairClientFactory } from "../chainOperator/TalentpairClientFactory";
import { TokenInterface } from "../../entities/token/TokenInterface";
import { ConfigStoreFactory } from "../config/ConfigStoreFactory";
import GrowthPartnerProfileSolidityJSON from "../../solidity/artifacts/contracts/TalentpairGrowthPartnerProfile.sol/TalentpairGrowthPartnerProfile.json";
import { ENV_NAME } from "../../config/constants/environments/env";
import * as ENV_URLS from "../../config/constants/blockchain/constants";
import { GrowthPartnerNFTT } from "./types";

export class GrowthPartnerNFT extends TokenInterface {
  token_id: string | number | undefined;
  s3: string;
  external: string;
  hash_value: string;
  fow_specialties: string[];
  growth_partner_uuid: string;
  agency_id: number;
  address: string;
  CONTRACT_NAME = "TalentpairGrowthPartnerProfile";

  constructor(props: GrowthPartnerNFTT) {
    super();

    this.token_id = undefined;

    const { s3, external } = this.getBaseURIs();
    this.s3 = s3 + props.s3;
    this.external = external + props.external;

    this.hash_value = props.hash_value;
    this.fow_specialties = props.fow_specialties;
    this.growth_partner_uuid = props.growth_partner_uuid;
    this.agency_id = props.agency_id;

    this.address = "";
  }

  async setup() {
    this.address = await this.getContractAddress();
    return this;
  }

  async mint(toAddress = "", tpClient = TalentpairClientFactory()) {
    console.log(this.address);
    const provider = tpClient.client;

    // contract interface definition
    const ABI = GrowthPartnerProfileSolidityJSON["abi"];
    const contract = new ethers.Contract(this.address, ABI, tpClient.wallet);

    const data = await contract.safeMint(
      toAddress,
      this.s3,
      this.external,
      this.hash_value,
      this.fow_specialties,
      this.growth_partner_uuid,
      this.agency_id,
    );

    await provider.waitForTransaction(data.hash);
    const receipt = await provider.getTransactionReceipt(data.hash);

    const transactionID = receipt.logs[0].topics.at(-1);
    if (typeof transactionID === "undefined") throw new Error("[ GrowthPartnerNFT ]: could not get token_id");

    const tokenId = parseInt(transactionID);

    this.token_id = tokenId;

    return this;
  }

  async getContract(tpClient = TalentpairClientFactory()) {
    const ABI = GrowthPartnerProfileSolidityJSON["abi"];

    return new ethers.Contract(this.address, ABI, tpClient.wallet);
  }

  toJSON() {
    return {
      token_id: this.token_id,
      deployed_address: this.address,
      symbol: "TPGP_PROFILE",
      name: "TalentpairGrowthPartnerProfile",
      s3URI: this.s3,
      externalURI: this.external,
    };
  }

  async getContractAddress(configStore = ConfigStoreFactory()) {
    return configStore.get(this.CONTRACT_NAME);
  }

  getBaseURIs() {
    switch (process.env.NODE_ENV) {
      case ENV_NAME.GOJIRA:
        return {
          s3: ENV_URLS.GOJIRA_NFT_S3_GP_URI,
          external: ENV_URLS.GOJIRA_NFT_INTERNAL_GP_URI,
        };
      case ENV_NAME.STAGING:
        return {
          s3: ENV_URLS.STAGING_NFT_S3_GP_URI,
          external: ENV_URLS.STAGING_NFT_INTERNAL_GP_URI,
        };
      case ENV_NAME.LOCAL:
      case ENV_NAME.TEST:
        return {
          s3: ENV_URLS.LOCAL_NFT_S3_GP_URI,
          external: ENV_URLS.LOCAL_NFT_INTERNAL_GP_URI,
        };
      default:
        Logger.warn(
          `[ GrowthPartnerNFT ]: unrecognized NODE_ENV [ ${process.env.NODE_ENV} ] defaulting to [ ${ENV_NAME.GOJIRA} ]`,
        );
        return {
          s3: ENV_URLS.GOJIRA_NFT_S3_GP_URI,
          external: ENV_URLS.GOJIRA_NFT_INTERNAL_GP_URI,
        };
    }
  }
}
