import * as anchor from "@project-serum/anchor";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AIRBNB_PROGRAM_PUBKEY } from "../constants";
import airbnbIDL from "../constants/airbnb.json";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { useAnchorWallet, useConnection, useWallet } from "@solana/wallet-adapter-react";
import { SystemProgram , PublicKey } from "@solana/web3.js";
import {authorFilter} from "../utils/index";

import {set} from "date-fns";
import {tr} from "date-fns/locale";


const useAirbnb = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const anchorWallet = useAnchorWallet();

    const [initialized, setInitialized] = useState(false);
    const [transactionPending, setTransactionPending] = useState(false);
    const [user, setUser] = useState({});
    const [organizations, setOrganizations] = useState([]);
    const [organizationMembers, setOrganizationMembers] = useState([]);
    const [lastOrganization, setLastOrganization] = useState(0);
    const [lastOrganizationMemberId, setLastOrganizationMemberId] = useState(0);
    const [loading, setLoading] = useState(false);
    





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
                    const [profilePda, profileBump] = findProgramAddressSync(
                        [utf8.encode("USER_STATE"), publicKey.toBuffer()],
                        program.programId
                    );
                    const profileAccount = await program.account.UserProfile.fetch(profilePda);
                    console.log(profileAccount)
                    if (profileAccount) {
                        console.log("User profile exists");
                        setLastOrganization(profileAccount.lastOrganization);
                        setLoading(true);
                        setInitialized(true);

                        const organizations = await program.account.organizationAccount.all();
                        const allOrganizationMembers = await program.account.organizationMemberAccount.all();
                        setUser(profileAccount.toString());
                        setOrganizations(organizations);

                        const myOrganizationMembers = allOrganizationMembers.filter((member) => member.account.authority.toString() == profileAccount.authority.toString());

                        setOrganizationMembers(myOrganizationMembers);
                    } else {
                        console.log("User profile does not exits")
                        setInitialized(false);
                    }
                } catch (e) {
                    console.log("Korisnik ne postoji/potrebno ga je inicijalizirati");
                    setInitialized(false);
                } finally {
                    setLoading(false);
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
                setLoading(true);
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
                    toast.success("User initialized successfully");
                    console.log("User initialized");
            }catch(e){
                console.error(e);
        } finally {
            setTransactionPending(false);
            setLoading(false);
        }
    }
};
// Add organization
const addOrganization = async ({name, description, maxMemberNumber, image}) => {
    console.log(name, description, maxMemberNumber, image, "YOOOOO");
    if(program && publicKey){
        setTransactionPending(true);
        setLoading(true);
        try{
            const [profilePda] = findProgramAddressSync(
                [utf8.encode("USER_STATE"), publicKey.toBuffer()], program.programId);
              const [organizationPda] = findProgramAddressSync(
                [utf8.encode("AIRBNB_STATE"), publicKey.toBuffer(), Uint8Array.from([lastOrganization])], program.programId);
               
                console.log(publicKey.toString(), program.programId, profilePda.toString(), organizationPda.toString(), lastOrganization, "AJMO BATICEE"); 

                await program.methods
                .createOrganization(name, description, maxMemberNumber, image)
                .accounts({
                    userProfile: profilePda,
                    organizationAccount: organizationPda,
                    authority: publicKey,
                    systemProgram: SystemProgram.programId,
                })
                .rpc();
                toast.success("Organization added successfully");
        }catch(e){
            console.error(e);   
    }finally{
        setTransactionPending(false);
        setLoading(false);
    }
}
};

    return {initialized, initializeUser, addOrganization, organizations, organizationMembers};
};

export default useAirbnb;