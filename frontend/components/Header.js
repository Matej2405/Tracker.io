import {  UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { truncate } from '../utils/string';
import React, { useState } from 'react';
import listingsData from '../data/listings';
import AddListingModal from './Listing/AddListingModal';

require('@solana/wallet-adapter-react-ui/styles.css');

function Header({ connected, publicKey, initializeUser, initialized, transactionPending }) {
    const [listings, setListings] = useState(listingsData);
    const [addListingModalOpen, setAddListingModalOpen] = useState(false);
    const [createOrganizationModalOpen, setCreateOrganizationModalOpen] = useState(false);

    const addListing = ({ location, country, price, description, imageURL }) => {
        console.log({ location, country, price, description, imageURL });
        const id = listings.length + 1;
        setListings([
            ...listings,
            {
                id,
                location: location,
                country: country,
                description,
                distance: 0,
                price: price,
                rating: 5,
                imageURL,
            },
        ]);
    };

    const editListing = ({ id, location, country, price, description, imageURL }) => {
        setListings(
            listings.map((listing) => {
                console.log(listing.location);
                if (listing.id === id) {
                    return {
                        ...listing,
                        location: location || listing.location.name,
                        country: country || listing.location.country,
                        description: description || listing.description,
                        distance: listing.distance.km,
                        price: price || listing.price.perNight,
                        imageURL: imageURL || listing.imageURL,
                        
                    };
                }
                return listing;
            })
        );
    };

    return (
        <header className="sticky top-0 transition-all md:grid md:grid-cols-3 items-center px-10 xl:px-20 py-4 z-50 bg-white border-b">
            <div className="relative">
                <h1 className='text-purple-500 font-jakarta font-bold text-[36px]'>Tracker</h1>
                <h2 className='text-purple-500 font-jakarta font-bold text-[12px] absolute top-0.5 left-20 px-11 py-1'>io</h2>
            </div>

            <div className="flex-1 flex xl:justify-center px-6 transition-all duration-300">
                <button className="flex-1 flex items-center justify-between border rounded-full p-2 w-[300px] shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center divide-x">
                       
                        <p className="text-gray-600 bg-transparent text-sm font-light px-4">Search for organizations</p>
                    </div>
                    <MagnifyingGlassIcon className="h-8 w-8 bg-purple-500 text-white stroke-[3.5px] p-2 rounded-full" />
                </button>
            </div>

            <div className="flex items-center justify-end">
                {connected ? (
                    <div className="border border-transparent cursor-pointer hover:bg-gray-100 rounded-full px-3 py-2">
                        <button onClick={() => setCreateOrganizationModalOpen(true)} className="text-sm font-medium transition-all duration-300 text-gray-800">
                            Create your own organization
                        </button>
                    </div>
                ) : (
                    <div className="border border-transparent cursor-pointer hover:bg-gray-100 rounded-full px-3 py-2">
                        <span className="text-sm font-medium transition-all duration-300 text-gray-800">
                            Connect your wallet to create an organization now
                        </span>
                    </div>
                )}

                <WalletMultiButton className='phantom-button' startIcon={<UserCircleIcon style={{ height: 32, width: 32, color: '#1f2937' }} />}>
                    <span className='text-sm font-medium text-black'>{connected ? truncate(publicKey.toString()) : "Connect Wallet"}</span>
                </WalletMultiButton>
            </div>

            <AddListingModal
                addListing={addListing}
                addListingModalOpen={addListingModalOpen}
                setAddListingModalOpen={setAddListingModalOpen}
            />

            <AddListingModal
                addListing={addListing}
                addListingModalOpen={createOrganizationModalOpen}
                setAddListingModalOpen={setCreateOrganizationModalOpen}
            />
        </header>
    );
}

export default Header;