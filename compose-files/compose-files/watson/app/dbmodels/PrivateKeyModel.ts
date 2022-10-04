import mongoose from "mongoose";
const { Schema, model } = mongoose;

interface IPrivateKey {
  privateKey: string;
  _id: string;
}

const privateKeySchema = new Schema<IPrivateKey>(
  {
    privateKey: { type: String, required: true },
    _id: { type: String, required: true },
  },
  { collection: "PrivateKeys" },
);

export const PrivateKeyModel = model<IPrivateKey>("PrivateKeys", privateKeySchema);
