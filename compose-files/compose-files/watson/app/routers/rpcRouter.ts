import express, { Request, Response } from "express";
import { validationResult, body, param } from "express-validator";
import { mintGrowthPartnerProfile } from "../useCases/nft/mintGrowthPartnerProfile";

export const rpcRouter = express.Router();

/**
 * @swagger
 * /mint-growth-partner-profile:
 *   post:
 *     description: mint a user profile with a default json blob given an id!
 *     parameters:
 *      - in: body
 *        name: growth_partner_uuid
 *        required: true
 *        description: uuid of a growth partner
 *      - in: body
 *        name: agency_id
 *        required: true
 *        description: agency_id of a growth partner
 *      - in: body
 *        name: hash_value
 *        required: true
 *        description: hash used to represent the growth partners profile/off chain representation
 *      - in: body
 *        name: fow_specialties
 *        required: true
 *        description: string array of the field of work specialties a growth partner has
 *     responses:
 *       200:
 *         description: The profile has been minted and a URIs to the object has been returned.
 *       400:
 *         description:
 */
const mintGrowthPartnerProfileController = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { user_id, growth_partner_uuid, agency_id, hash_value, fow_specialties } = req.body;

  const tokenURI = await mintGrowthPartnerProfile(user_id, {
    growth_partner_uuid,
    agency_id,
    hash_value,
    fow_specialties,
  });
  if (!tokenURI) {
    res.status(400).send({
      ok: false,
      data: "error minting growth partner profile",
    });
  } else {
    res.send(tokenURI);
  }
};

rpcRouter.post(
  "/mint-growth-partner-profile/",
  body("user_id"),
  body("growth_partner_uuid"),
  body("agency_id"),
  body("hash_value"),
  body("fow_specialties"),
  mintGrowthPartnerProfileController,
);
