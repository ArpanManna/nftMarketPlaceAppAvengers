import '../styles/globals.css'
import Link from 'next/link'

function Marketplace({ Component, pageProps }) {
  return (
    <div className='flex flex-col'>
      <nav className='flex flex-col justify-center items-center'>
        <p className='text-4xl font-bold text-green-700' >NFT Marketplace</p>
        <div className='flex mt-4'>
          <Link href='/'>
             <a className='mr-6 text-yellow-600'>Marketplace</a>
          </Link>
          <Link href='/create-item'>
             <a className='mr-6 text-yellow-600'>Mint NFTs</a>
          </Link>
          <Link href='/myAssets'>
             <a className='mr-6 text-yellow-600'>MY NFTs</a>
          </Link>
        </div>
      </nav>
      <Component {...pageProps} />
    </div>
  )
}

export default Marketplace