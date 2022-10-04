import { Request, Response } from "express";
import { getSecret } from "./secrets";
import { AUTH_PASSWORD } from "./constants/general";
import { compare, hash } from "bcrypt";

// This is an in-memory password auth provided by the environment variable AUTH_PASSWORD

let passwordHash: string;
hash(getSecret(AUTH_PASSWORD) || "", 1, function (err, hash) {
  passwordHash = hash;
});

export const simpleBasicAuth = async (req: Request, res: Response, next: Function) => {
  const base64 = req.get("Authorization")?.split(" ")[1] || "";
  const [username, password] = Buffer.from(base64, "base64").toString().split(":");

  if (username !== "django") {
    res.sendStatus(401);
  } else {
    compare(password, passwordHash, (err, result) => {
      if (result) next();
      else res.sendStatus(401);
    });
  }
};
