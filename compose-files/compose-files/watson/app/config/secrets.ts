import dotenv from "dotenv";
dotenv.config();

export const BLOCKCHAIN_SECRET = "BLOCKCHAIN";
export const TALENTPAIR_ACCOUNT_ID = "TALENTPAIR_ACCOUNT_ID";
export const TALENTPAIR_PRIVATE_KEY = "TALENTPAIR_PRIVATE_KEY";

export const DATABASE = "DATABASE";

export function getSecret(name: string) {
  if (process.env.LOCALHOST) {
    return process.env[name];
  }
  // connect to aws secret manager and check secrets
  return process.env[name];
}
