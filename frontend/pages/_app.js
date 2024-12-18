import dynamic from 'next/dynamic'
import Head from 'next/head'
import '../styles/globals.css'
//dinamicko i asinkrono importanje komponente WalletConnectionProvider
const WalletConnectionProvider = dynamic(() => import('../context/WalletConnectionProvider'), { ssr: false })


function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Tracker.io</title>
            </Head>
            <WalletConnectionProvider>
            <Component {...pageProps} />
            </WalletConnectionProvider>
               
        </>
    )
}

export default MyApp
