import { expect } from "chai";
import { ethers } from "hardhat";

describe("TalentpairGrowthPartnerProfile", () => {
  it("should return correct name", async function () {
    const MyContract = await ethers.getContractFactory("TalentpairGrowthPartnerProfile");

    const MyContractDeployed = await MyContract.deploy();

    await MyContractDeployed.deployed();

    expect(await MyContractDeployed.name()).to.equal("TalentpairGrowthPartnerProfile");
    expect(await MyContractDeployed.symbol()).to.equal("TPGP_PROFILE");
  });

  it("should return token ID", async function () {
    const accounts = await ethers.getSigners();
    const [deployer, owner, buyer1] = accounts;

    const MyContract = await ethers.getContractFactory("TalentpairGrowthPartnerProfile");

    const MyContractDeployed = await MyContract.deploy();

    await MyContractDeployed.deployed();

    expect(await MyContractDeployed.name()).to.equal("TalentpairGrowthPartnerProfile");
    expect(await MyContractDeployed.symbol()).to.equal("TPGP_PROFILE");

    const tokenInput = {
      uri: "this is a uri",
      external_uri: "second uri",
      hash_value: "adsfasda",
      fows: ["cassandra", "java"],
      growth_partner_uuid: "asdqedeadc",
      agency_id: 1,
    };

    const mintTx = await MyContractDeployed.safeMint(
      deployer.address,
      tokenInput.uri,
      tokenInput.external_uri,
      tokenInput.hash_value,
      tokenInput.fows,
      tokenInput.growth_partner_uuid,
      tokenInput.agency_id,
    );
    const mintTxReceipt = await mintTx.wait(1);

    // @ts-expect-error
    const tokenId = parseInt(mintTxReceipt.events[0].args.tokenId);

    expect(tokenId).to.equal(0);

    const token = await MyContractDeployed.getNFT(0);

    expect(tokenInput.uri).to.equal(token.uri);
    expect(tokenInput.hash_value).to.equal(token.hash_value);
    expect(tokenId).to.equal(token.token_id);
    expect(tokenInput.agency_id).to.equal(token.agency_id);
    expect(tokenInput.growth_partner_uuid).to.equal(token.growth_partner_uuid);
    expect(tokenInput.fows.toString()).to.equal(token.fow_specialties.toString());
  });

  it("should be minted to correct account", async function () {
    const accounts = await ethers.getSigners();
    const [deployer, owner, buyer1] = accounts;

    const MyContract = await ethers.getContractFactory("TalentpairGrowthPartnerProfile");

    const MyContractDeployed = await MyContract.deploy();

    await MyContractDeployed.deployed();

    expect(await MyContractDeployed.name()).to.equal("TalentpairGrowthPartnerProfile");
    expect(await MyContractDeployed.symbol()).to.equal("TPGP_PROFILE");

    const tokenInput = {
      uri: "this is a uri",
      external_uri: "second uri",
      hash_value: "adsfasda",
      fows: ["cassandra", "java"],
      growth_partner_uuid: "asdqedeadc",
      agency_id: 1,
    };

    const mintTx = await MyContractDeployed.safeMint(
      buyer1.address,
      tokenInput.uri,
      tokenInput.external_uri,
      tokenInput.hash_value,
      tokenInput.fows,
      tokenInput.growth_partner_uuid,
      tokenInput.agency_id,
    );
    const mintTxReceipt = await mintTx.wait(1);

    // @ts-expect-error
    const tokenId = parseInt(mintTxReceipt.events[0].args.tokenId);

    expect(tokenId).to.equal(0);

    const token = await MyContractDeployed.getNFT(0);
    expect((await MyContractDeployed.balanceOf(buyer1.address)).toNumber()).to.equal(1);
    expect((await MyContractDeployed.balanceOf(deployer.address)).toNumber()).to.equal(0);
    // console.log("buyer1 has X tokens: ", await MyContractDeployed.balanceOf(buyer1.address));
  });
});
