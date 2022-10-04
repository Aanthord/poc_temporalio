import Logger from "../../config/logger";
import { GPNFTFactory, GrowPartnerNFTT } from "../../adapters/nft/NFTFactory";
import { WalletDbFactory } from "../../adapters/wallet/WalletDbFactory";

export async function mintGrowthPartnerProfile(
  userId: string,
  nftProps: Omit<GrowPartnerNFTT, "s3" | "external">,
  nftFactory = GPNFTFactory,
  walletDbFactory = WalletDbFactory,
) {
  try {
    // get the users wallet from user id
    const walletDb = await walletDbFactory().get(userId);

    let nft = await nftFactory({
      ...nftProps,
      s3: nftProps.growth_partner_uuid,
      external: nftProps.growth_partner_uuid,
    });
    nft = await nft.mint(walletDb.model.address);

    if (typeof nft.token_id === "undefined") throw new Error("couldn't create nft");

    // save to db
    walletDb.model.tokens = [...walletDb.model.tokens, nft.toJSON()];
    walletDb.save(userId, {
      _id: userId,
      address: walletDb.model.address,
      tokens: walletDb.model.tokens,
    });

    return walletDb.toJSON(walletDb.model);
  } catch (exception) {
    Logger.error(`mintUserProfile: ${exception}`);
    return false;
  }
}
