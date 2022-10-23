import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState, useEffect, useRef } from 'react';
import Web3Modal from 'web3modal';
import { Contract, providers, utils } from "ethers";
import { nftMarketplaceAddress, nftTokenAddress, nftTokenABI, nftMarketplaceABI } from '../../config';
import axios from "axios";
import { ethers } from 'ethers';
import Marketplace from './_app';

export default function myAssets() {

  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
    // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();
  const [accountAddress, setAccountAddress] = useState(undefined)
  const [purchasedNFTs, setPurchasedNFTs] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')

  useEffect(() => {
    if(!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "goerli",
        providerOptions: {},
        disableInjectedProvider: false,
      })
    }
    connectWallet()
    loadPurchasedNFTs()
  }, [walletConnected])

  const connectWallet = async () => {
    try{
      await getProviderOrSigner()
      setWalletConnected(true)
    }catch(error) {
      console.log(error)
    }
  }
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const accounts = await web3Provider.listAccounts()
    console.log(accounts[0])
    setAccountAddress(accounts[0])  
    // If user is not connected to the Mumbai network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Change the network to Goerli");
      throw new Error("Change network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  }

  const renderConnectButton = () => {
    if(!walletConnected){
      return(
        <button onClick={connectWallet} className={styles.button}>Connect Wallet</button>
      )
    }
    return (
      <div className='truncate'>Connected to {accountAddress}</div>
    )
  }

  const loadPurchasedNFTs = async() => {
    try {
      const provider = await getProviderOrSigner();
      const marketplaceContract = new Contract(nftMarketplaceAddress, nftMarketplaceABI, provider);
      const myNFTs = await marketplaceContract.getPurchasedNFTs();
      console.log('purchased NFTs',myNFTs)
      const nftTokenContract = new Contract(nftTokenAddress, nftTokenABI, provider);
      const items = await Promise.all(myNFTs.map(async i => {
        let tokenURI = await nftTokenContract.tokenURI(i.tokenId);
        tokenURI = tokenURI.replace(/ipfs.infura.io/g, "ipfs.io");
        console.log(tokenURI);
        const meta = await axios.get(tokenURI);
        //console.log('meta : ', meta)
        let price = ethers.utils.formatUnits(i.price.toString(),'ether');
        //console.log(price)
        let item ={
          price,
          tokenId: i.tokenId,
          seller: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        console.log(item)
        return item;
      }))
      console.log('items',items)
      setPurchasedNFTs(items)
      console.log('items after',items)
      setLoadingState('loaded')
    } catch(error) {
      console.log(error)
    }
  }




  return (
    
    <div className='flex justify-center'>
      <div className='p-4'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 pb-[112px]'>
          {
            purchasedNFTs.map( (purchasedNFT, i) => (
              <div key={i} className='border shadow rounded-xl overflow-hidden'>
                <img className='h-[250px] w-[250px] object-cover' src={purchasedNFT.image}/>
                <div className='p-4 bg-black'>
                  <p className='text-2xl font-bold text-white'
                    >{purchasedNFT.price} Ether </p>
                </div>
              </div>
            ) )
          }
        </div>
      </div>
      <div className='absolute right-20 w-[200px] overflow-hidden text-ellipsis'>
        {renderConnectButton()}
      </div>
    </div>
  )
}