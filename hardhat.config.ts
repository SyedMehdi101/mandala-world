import * as dotenv from "dotenv";

import { HardhatUserConfig, task } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

const accounts = [
  'a872f6cbd25a0e04a08b1e21098017a9e6194d101d75e13111f71410c59cd57f',
  '5b9a07c57ec4dde43639937186fd34c345cb6297ca98d4c05a89b2dedf00f1e3',
];

const config: HardhatUserConfig = {
  solidity: "0.8.4",
  defaultNetwork: process.env.DEPLOY_ON,
  networks: {
    mandala: {
      url: 'http://127.0.0.1:8545',
      accounts
    },
    mandalaPub: {
      url: 'https://tc7-eth.aca-dev.network',
      accounts
    }
  }
};

export default config;
