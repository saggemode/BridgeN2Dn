require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const fs = require("fs");
const privateKey = fs.readFileSync(".secret").toString().trim();
const projectId = "_N2T74yygUy1yEG7v2B_mbU2ML1bKWW9";

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
      //url: "http://node.a3b.io:8545",
      //url: `https://polygon-mumbai.g.alchemy.com/v2/${projectId}`,
      account: process.env.hardhat_key,
    },
    mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.g.alchemy.com/v2/${projectId}`,
      account: process.env.pkey,
      //accounts: [privateKey],
    },
    polygon: {
      chainId: 137,
      url: "https://rpc-mainnet.maticvigil.com",
      account: process.env.pkey,
    },
    ethereum: {
      chainId: 1,
      url: "https://main-rpc.linkpool.io",
      account: process.env.pkey,
    },
    binance: {
      chainId: 57,
      url: "https://bscrpc.com",
      account: process.env.pkey,
    },
    bsctest: {
      chainId: 97,
      url: "https://data-seed-prebsc-1-s3.binance.org:8545",
      account: process.env.pkey,
    },
    kovan: {
      chainId: 42,
      url: "https://kovan.infura.io/v3/3cf2d8833a2143b795b7796087fff369",
      account: process.env.pkey,
    }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
  //solidity: "0.8.17",
};
