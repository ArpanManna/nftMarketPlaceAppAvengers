# 🖼️ NFT Marketplace
This is a fullstack DApp NFT Marketplace built  with NodeJS, Hardhat, Solidity, ReactJS, NextJS , ethers.js and Vercel.

# Market basic actions

You can **create** (mint) new tokens, uploading their image and metadata on [IPFS](https://ipfs.io/) using [Infura](https://infura.io/).  
After creating an NFT, you can also **sell** it by setting a price and paying a royalty fee.  
When **buying** an NFT, the price will be transferred to the seller and the royalty to the NFT Marketplace contract.  
The contract is deployed to the **Goerli Testnet** using [Alchemy](https://www.alchemy.com/) as a node provider and all transaction happen through Metamask. 

# Environment Steup 
'''
create directory named hardhat 
mkdir hardhat
cd hardhat
npm init --yes
npm install --save-dev hardhat
npx hardhat
npm install @openzeppelin/contracts
'''

## npx create-next-app@latest
## cd my-app
## npm run dev
## npm install web3modal
## npm install ethers
## npm install tailwindcss@latest postcss@latest autoprefixer

## npx tailwindcss init -p


## npx hardhat compile
## npx hardhat run scripts/deploy.js --network goerli
