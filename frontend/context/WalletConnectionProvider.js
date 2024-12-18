import {ConnectionProvider, WalletProvider} from '@solana/wallet-adapter-react';
import {WalletModalProvider} from '@solana/wallet-adapter-react-ui';
import {PhantomWalletAdapter} from '@solana/wallet-adapter-phantom';
import {useMemo} from 'react';
const connection =  "https://solemn-snowy-mansion.solana-devnet.quiknode.pro/8853469d8531aa21ab6b627b91fc1074561916a0";

const WalletConnectionProvider = ({children}) => {
    // our endping for the wallet
    const endpoint = useMemo(() => connection, [])
    //our wallet set up
    const wallets = useMemo(() => [new PhantomWalletAdapter()], [])

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