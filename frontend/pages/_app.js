import dynamic from 'next/dynamic'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Head from 'next/head'
import '../styles/globals.css'
//dinamicko i asinkrono importanje komponente WalletConnectionProvider
const WalletConnectionProvider = dynamic(() => import('../context/WalletConnectionProvider'), { ssr: false })


function MyApp({ Component, pageProps }) {
    console.log('GOOGLE_CLIENT_ID', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

    return (
        <>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
            <Head>
                <title>Tracker.io</title>
            </Head>
            <WalletConnectionProvider>
            <Component {...pageProps} />
            </WalletConnectionProvider>
                </GoogleOAuthProvider>
        </>
    )
}

export default MyApp
