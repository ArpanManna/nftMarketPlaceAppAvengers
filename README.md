# 🖼️ NFT Marketplace
This is a fullstack DApp NFT Marketplace built  with NodeJS, Hardhat, Solidity, ReactJS, NextJS , ethers.js and Vercel.

# Market basic actions

You can **create** (mint) new tokens, uploading their image and metadata on [IPFS](https://ipfs.io/) using [Infura](https://infura.io/).  
After creating an NFT, you can also **sell** it by setting a price and paying a royalty fee.  
When **buying** an NFT, the price will be transferred to the seller and the royalty to the NFT Marketplace contract.  
The contract is deployed to the **Goerli Testnet** using [Alchemy](https://www.alchemy.com/) as a node provider and all transaction happen through Metamask. 

# Environment Steup 
## Clone the repository
```sh
https://github.com/ArpanManna/nftMarketPlaceAppAvengers.git
```
## Change directory to hardhat 
```sh
npm install
```
## Change directory to my-app
```sh
npm install
```
## To start the development server run 
```sh
npm run dev
```
NFT marketplace is running on localhost:3000