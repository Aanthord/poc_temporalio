/* istanbul ignore file */
import express, { Express, Request, Response } from "express";
import swaggerUI from "swagger-ui-express";
import dotenv from "dotenv";
import { openapiSpecification, swaggerSetupOptions } from "./config/swaggerSpec";
import { walletRouter } from "./routers/walletRouter";
import { rpcRouter } from "./routers/rpcRouter";
import Logger from "./config/logger";
import morganMiddleware from "./config/morganMiddleware";
import { getDB } from "./db";
import { simpleBasicAuth } from "./config/simpleAuth";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// Swagger/Open API endpoint
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openapiSpecification, swaggerSetupOptions));

// simple username password authorization, provided in Authentication header in the format of
// Authorization: Basic base64EncodedString(username:password)
if (!process.env.NODE_ENV) {
  app.use(simpleBasicAuth);
}
// request body parser
app.use(express.json());
// logger
app.use(morganMiddleware);

app.use(walletRouter);
app.use(rpcRouter);

export { app };

export function start() {
  getDB({ logLevel: "FULL" });
  app.listen(7001, () => {
    Logger.info("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░");
    Logger.info("░██╗░░░░░░░██╗░█████╗░████████╗░██████╗░█████╗░███╗░░██╗░");
    Logger.info("░██║░░██╗░░██║██╔══██╗╚══██╔══╝██╔════╝██╔══██╗████╗░██║░");
    Logger.info("░╚██╗████╗██╔╝███████║░░░██║░░░╚█████╗░██║░░██║██╔██╗██║░");
    Logger.info("░░████╔═████║░██╔══██║░░░██║░░░░╚═══██╗██║░░██║██║╚████║░");
    Logger.info("░░╚██╔╝░╚██╔╝░██║░░██║░░░██║░░░██████╔╝╚█████╔╝██║░╚███║░");
    Logger.info("░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░░╚════╝░╚═╝░░╚══╝░");
    Logger.info("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░");
    Logger.info("░░░░░░░   Wallet And Token Service On Node   ░░░░░░░░░░░░");
    Logger.info("░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░");
    Logger.info(`[ ⚡️Watson⚡️ ]: NODE_ENV ${process.env.NODE_ENV}`);
    Logger.info(`[ ⚡️Watson⚡️ ]: running at https://localhost:${port}`);
  });
}
