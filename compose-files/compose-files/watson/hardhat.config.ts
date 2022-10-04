import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      // auto mining: this actually starts automining...
      // mining: {
      //   auto: false,
      //   interval: 1000,
      // },
    },
    coston: {
      url: "https://coston-api.flare.network/ext/bc/C/rpc",
      chainId: 16,
      accounts: ["0x5c3c8d984cc06d7e5b1c56126d55c966605148f22f8e77e6f5a1d503777c42cd"],
    },
  },
  paths: {
    // npx hardhat compile will put artifacts in build folder.
    // Need them here and when we build the project we copy them to the dist directory as well
    artifacts: "./app/solidity/artifacts",
    tests: "./contracts/__tests__",
  },
};

/* 
TIP

Looking for a replacement of Waffle's loadFixture? You can find our version of it in Hardhat Network Helpers.
https://hardhat.org/hardhat-network-helpers/docs/reference#fixtures
*/

export default config;
