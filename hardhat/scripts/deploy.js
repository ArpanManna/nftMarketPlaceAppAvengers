const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });


async function main() {
  
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