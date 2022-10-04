import { KeyStoreInterface } from "../../entities/KeyStoreInterface/KeyStoreInterface";
import Logger from "../../config/logger";
import { ConfigModel } from "../../dbmodels/ConfigModel";

export class ConfigStoreMongoImpl implements KeyStoreInterface {
  constructor() {
    Logger.info("[KeyStoreMongoImpl]: constructing");
  }

  async save(id: string, value: string): Promise<boolean> {
    try {
      const pk = new ConfigModel({
        _id: id,
        value,
      });
      pk.save();
      return true;
    } catch (exception) {
      Logger.error(exception);
      return false;
    }
  }

  async get(key: string): Promise<string> {
    // const config = await ConfigModel.findById(key);
    const config = await ConfigModel.findOne({
      name: key,
      environment: process.env.NODE_ENV,
      chain: process.env.BLOCKCHAIN,
    });
    if (!config)
      throw new Error(`couldn't get config from storage based on key: ${key} and env: ${process.env.ENVIRONMENT}`);

    return config.value;
  }
}
