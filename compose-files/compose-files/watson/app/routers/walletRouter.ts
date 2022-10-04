import express, { Request, Response } from "express";
import { validationResult, body, param } from "express-validator";
import { createAccount } from "../useCases/wallet/createAccount";
import { getWalletInfo } from "../useCases/wallet/getWalletInfo";

export const walletRouter = express.Router();

async function getWalletController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const wallet = await getWalletInfo(req.params.user_id);

  res.send(wallet);
}

async function createWalletController(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { user_id } = req.body;

  const resp = await createAccount(user_id);

  if (!resp.ok) res.status(400);

  res.send(resp);
}

walletRouter.get("/wallet/:user_id", param("user_id"), getWalletController);
walletRouter.post("/wallet", body("user_id"), createWalletController);
