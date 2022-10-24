# Install
## create directory named hardhat and run following commands
```sh
mkdir hardhat
cd hardhat
npm init --yes
npm install --save-dev hardhat
npx hardhat
npm install @openzeppelin/contracts
```

## In the root directory run following commands
```sh
npx create-next-app@latest
cd my-app
npm install web3modal
npm install ethers
npm install tailwindcss@latest postcss@latest autoprefixer
npx tailwindcss init -p
```

## To deploy the contracts run following scripts
```sh
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
```
