const { HardhatUserConfig } = require("hardhat/config");
//require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();


const config = {
  solidity: "0.8.19",
  networks: {
    etherlinkTest: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: [process.env.MY_PRIVATE_KEY],
    }
  }
};
module.exports = config;
