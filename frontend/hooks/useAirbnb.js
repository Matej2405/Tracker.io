import * as anchor from "@project-serum/anchor";
import { useEffect, useMemo, useState } from "react";
import { AIRBNB_PROGRAM_PUBKEY } from "../constants";
import airbnbIDL from "../constants/airbnb.json";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram } from "@solana/web3.js";
import {authorFilter} from "../utils/index";
import { PublicKey } from "@solana/web3.js";
import {set} from "date-fns";
import {tr} from "date-fns/locale";


const useAirbnb = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const anchorWallet = useAnchorWallet();

    const [initialized, setInitialized] = useState(false);
    const [transactionPending, setTransactionPending] = useState(false);
    const program = useMemo(() => {
        if (anchorWallet) {
            const provider = new anchor.AnchorProvider(connection, anchorWallet, anchor.AnchorProvider.defaultOptions());
            return new anchor.Program(airbnbIDL, AIRBNB_PROGRAM_PUBKEY, provider);
        }
    }, [connection, anchorWallet]);
    

    // When we load the app we want to fetch all the listings
    // Check if the user profile exists
    // If it does, fetch the listings
    // If it doesn't, create the user profile
    // Then fetch the listings
    //fecthing users(if they exist)
    useEffect(() => {
        const start = async () => {
            if (program && publicKey && !transactionPending) {
                try {
                    const [profilePda] = findProgramAddressSync(
                        [utf8.encode("USER_STATE"), publicKey.toBuffer()],
                        program.programId
                    );
                    const profileAccount = await program.account.userProfile.fetch(profilePda);

                    if (profileAccount) {
                        console.log("User profile exists");
                        setInitialized(true);
                    } else {
                        console.log("User profile does not exits")
                        setInitialized(false);
                    }
                } catch (e) {
                    console.error(e);
                } 
            }
        };
        start();
    }, [program, publicKey, transactionPending]);


    // Initialize the user
    const initializeUser = async () => {
        if(program && publicKey){
            try{
                setTransactionPending(true);
                const [profilePda] = findProgramAddressSync(
                    [utf8.encode("USER_STATE"), publicKey.toBuffer()],
                    program.programId
                );
                const tx = await program.methods
                .initializeUser()
                .accounts(
                    {
                        userProfile: profilePda,
                        authority: publicKey,
                        systemProgram: SystemProgram.programId,
                    })
                    .rpc();
                    setInitialized(true);
                    console.log("User initialized");
            }catch(e){
                console.error(e);
        } finally {
            setTransactionPending(false);
        }
    }
};

    return {initialized, initializeUser};
};

export default useAirbnb;