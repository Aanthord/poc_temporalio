import mongoose from "mongoose";
import { getDB } from "../app/db";
import { ConfigModel } from "../app/dbmodels/ConfigModel";

export async function saveContractAddress(
  contractName = "unknown",
  environment = "test",
  chain = "",
  address: "unknown",
) {
  getDB({ logLevel: "FULL" });

  await ConfigModel.findOneAndUpdate(
    {
      name: contractName,
      environment,
      chain,
    },
    {
      name: contractName,
      environment,
      chain,
      value: address,
    },
    {
      upsert: true,
    },
  );
  console.log(`Inserted new record with id [ ${contractName} ] with value [ ${address} ]`);
}
