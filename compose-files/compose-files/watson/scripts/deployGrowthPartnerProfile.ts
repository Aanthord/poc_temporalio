import { ethers } from "hardhat";
import { saveContractAddress } from "./saveContractAddress";
import dotenv from "dotenv";

dotenv.config();

export async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const MyContract = await ethers.getContractFactory("TalentpairGrowthPartnerProfile");
  // calls constructor
  const MyContractDeployed = await MyContract.deploy();

  await MyContractDeployed.deployed();

  const address: string = MyContractDeployed.address.toString();
  console.log(
    "deployed contract to:",
    address,
    "using environment:",
    process.env.NODE_ENV || "local",
    "on chain:",
    process.env.BLOCKCHAIN,
  );

  // save to mongo impl keystore for getting when running app
  await saveContractAddress(
    "TalentpairGrowthPartnerProfile",
    process.env.NODE_ENV,
    process.env.BLOCKCHAIN,
    address as any,
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
