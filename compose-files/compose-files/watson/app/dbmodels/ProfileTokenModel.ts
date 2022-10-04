import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IProfileNft {
  _id: string;
  metadata: object[];
  symbol: string;
  name: string;
}

const profileNftSchema = new Schema<IProfileNft>(
  {
    _id: { type: String, required: true },
    metadata: { type: [Object], required: true },
    symbol: { type: String, required: true },
    name: { type: String, required: true },
  },
  { collection: "ProfileTokens" },
);

export const ProfileTokenModel = model<IProfileNft>("ProfileToken", profileNftSchema);
