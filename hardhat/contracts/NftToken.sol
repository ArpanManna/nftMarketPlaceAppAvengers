// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/* import openzeppelin contracts */
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NftToken is ERC721URIStorage{
    using Counters for Counters.Counter;
	Counters.Counter private _tokenIds;

	address contractAddress;

	constructor(address marketplaceAddress) ERC721("VIMarketPlace", "VI") {
	    contractAddress = marketplaceAddress;
	}

	function mintNFTs(string memory tokenURI) public returns (uint) { 
		// incerement token id
		_tokenIds.increment();
		uint256 newTokenId=_tokenIds.current();
		// mint the new NFT token and transfer it to the caller of the function
		_mint(msg.sender, newTokenId);
		// set token URI of the new NFT token
		_setTokenURI(newTokenId, tokenURI);
		// approve marketplace to transfer token on behalf of owner
		setApprovalForAll(contractAddress, true);
		return newTokenId;
	}
}