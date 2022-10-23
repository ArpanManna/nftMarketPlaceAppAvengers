// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

/* import openzeppelin contracts */
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";    // utility counter to increment or decrement token ids
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol"; // import ERC721 from openzeppelin
// import "../node_modules/@openzeppelin/contracts/security/ReentrancyGuard.sol"; 

contract Marketplace {

    using Counters for Counters.Counter; 
    Counters.Counter private _itemIds; // keep track of each nft item created
    Counters.Counter private _itemsSold;  // keep track of items sold in marketplace
    address payable owner; // owner of marketplace contract
    uint256 royalty = 0.050 ether; // marketplace contract earn some royalty on each item sold

    constructor() {
        owner = payable(msg.sender);
    }

    /* declare a structure for Marketplace NFTs */

    struct MarketItem {
        uint itemid;    // market item id
        address nftContract;
        uint256 tokenId; // nft token id
        address payable seller;  // address of seller
        address payable owner;  // owner of the NFT
        uint256 price;   // price of item
        bool sold;    // item sold or not
    }

    mapping(uint256 => MarketItem) private idToMarketItem; // mapping of token id to Marketplace object
    event NftListed (uint indexed itemId, address indexed nftContract, uint256 indexed tokenId, address seller, address owner, uint256 price, bool sold);

    /* Returns the listing price of the contract */ 
    function getRoyalty() public view returns (uint256) { 
        return royalty;
    }

    /* List an NFT for sale in the marketplace */
    function listNftInMarket(address nftContract, uint256 tokenId, uint256 price) public payable {
        require(price > 0, "Price must be at least 1 wei"); 
        require(msg.value == royalty, "Price must be equal to royalty");
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        // create Market item and put in mapping
        idToMarketItem[itemId] = MarketItem(itemId, nftContract, tokenId, payable(msg.sender), payable(address(0)), price, false);
        // transfer ownership of the token from owner to marketplace
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);   
        // emit NftListed event
        emit NftListed(itemId, nftContract, tokenId, msg.sender, address(0), price, false);
    }

    /* Function to create sale of a NFT in the marketplace */
    /* To transfers ownership of the NFT and transfer of funds between buyer and seller */

    function saleNFTs(address nftContract, uint256 itemId) public payable {

        uint price = idToMarketItem[itemId].price; 
        uint tokenId = idToMarketItem[itemId].tokenId;
        require(msg.value == price, "Please submit the asking bid to complete the purchase");
        // transfer purchase amount to the seller
        idToMarketItem[itemId].seller.transfer(msg.value);
        // transfer ownership of NFT from marketplace to buyer
        IERC721(nftContract).transferFrom(address(this),msg.sender, tokenId);
        // buyer (caller of the function) become the new owner of the NFT
        idToMarketItem[itemId].owner = payable(msg.sender);
        // set NFT as sold
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
        // transfer royalty to the marketplace
        payable(owner).transfer(royalty);

    }


    /* Returns all unsold NFTs in the market */
    function getUnsoldNFTs() public view returns(MarketItem[] memory) {

        uint itemCount = _itemIds.current();
        uint unsoldNFTsCount = _itemIds.current() - _itemsSold.current();
        uint currentIndex = 0;
        // declare an array and push all unsold NFTs
        MarketItem[] memory unsoldNFTs = new MarketItem[](unsoldNFTsCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i+1].owner == address(0)){
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                unsoldNFTs[currentIndex]=currentItem;
                currentIndex += 1;
            }
        }
        return unsoldNFTs;
    }


    /* Returns all purchased NFTs of an address */ 

    function getPurchasedNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _itemIds.current();
        uint purchasedNFTCount = 0;
        uint currentIndex = 0;
        // count the NFTs user has purchased
        for(uint i=0; i < totalItemCount; i++){
            if(idToMarketItem[i+1].owner == msg.sender){
                purchasedNFTCount += 1;
            }
        }
        // declare an array and push all purchased NFTs
        MarketItem[] memory purchasedNFTs = new MarketItem[](purchasedNFTCount);
        for(uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i+1].owner == msg.sender) {
                uint currentId = i+1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                purchasedNFTs[currentIndex]=currentItem;
                currentIndex += 1;
            }
        }
        return purchasedNFTs;
    }
}