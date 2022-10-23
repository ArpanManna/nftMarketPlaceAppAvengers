const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
//const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL } = require("../constants");

async function main() {
  // Address of the whitelist contract that you deployed in the previous module
  //const whitelistContract = WHITELIST_CONTRACT_ADDRESS;
  // URL from where we can extract the metadata for a Crypto Dev NFT
  //const metadataURL = METADATA_URL;
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so cryptoDevsContract here is a factory for instances of our CryptoDevs contract.
  */
  const marketplaceContract = await ethers.getContractFactory("Marketplace")
  const nftTokenContract = await ethers.getContractFactory("NftToken");

  // deploy the contract
  const deployedMarketplace = await marketplaceContract.deploy()
  console.log("Marketplace Contract Address:", deployedMarketplace.address);
  const marketplaceContractAddress = deployedMarketplace.address
  const deployedNftTokenContract = await nftTokenContract.deploy(marketplaceContractAddress);

  // print the address of the deployed contract
  console.log("NftToken Contract Address:", deployedNftTokenContract.address);
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });