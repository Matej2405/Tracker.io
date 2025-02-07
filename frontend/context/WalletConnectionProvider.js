import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {SolflareWalletAdapter} from '@solana/wallet-adapter-wallets';
import {useMemo} from 'react';
const connection =  "https://api.devnet.solana.com";
const WalletConnectionProvider = ({children}) => {
    // our endping for the wallet
    const endpoint = useMemo(() => connection, [])
    //our wallet set up
    const wallets = useMemo(() => [new SolflareWalletAdapter()], [])

    return(
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets = {wallets} autoConnect> 
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
            </ConnectionProvider>	
    )
}
export default WalletConnectionProvider;