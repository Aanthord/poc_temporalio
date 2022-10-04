import mongoose from "mongoose";

const { Schema, model } = mongoose;

interface IConfig {
  value: string;
  environment: string;
  chain: string;
  name: string;
}

const ConfigSchema = new Schema<IConfig>(
  {
    value: { type: String, required: true },
    environment: { type: String, required: true },
    chain: { type: String, required: true },
    name: { type: String, required: true },
  },
  { collection: "Config" },
);

export const ConfigModel = model<IConfig>("Config", ConfigSchema);
