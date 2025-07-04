import {  UserCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { truncate } from '../utils/string';
import React, { useState } from 'react';
import listingsData from '../data/listings';
import AddListingModal from './Listing/AddListingModal';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


require('@solana/wallet-adapter-react-ui/styles.css');

function Header({ connected, publicKey, initializeUser, initialized, transactionPending }) {
    const [listings, setListings] = useState(listingsData);
    const [addListingModalOpen, setAddListingModalOpen] = useState(false);
    const [createOrganizationModalOpen, setCreateOrganizationModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
     const [user, setUser] = useState(null);

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
    const filteredListings = listings.filter((listing) =>
    listing.location.toLowerCase().includes(searchTerm.toLowerCase())
);
const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
    setSearchTerm('');
};


    return (
        <header className="sticky top-0 transition-all md:grid md:grid-cols-3 items-center px-10 xl:px-20 py-4 z-50 bg-white border-b">
            <div className="relative">
                <img 
                    src = "/assets/logo.png" 
                    alt="Tracker.io Logo" 
                    className="h-16 w-16 object-contain" 
                    style={{ transform: 'scale(3)' }}
                />
            </div>

            <div className="flex-1 flex xl:justify-center px-6 transition-all duration-300">
                 <form className="flex-1 flex items-center justify-between border rounded-full p-2 w-[300px] shadow-sm hover:shadow-md transition-all">
                <input
            type="text"
            placeholder="Search for organizations"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 bg-transparent text-gray-600 text-sm font-light focus:outline-none"
                />
        <button type="submit">
            <MagnifyingGlassIcon className="h-8 w-8 bg-purple-500 text-white stroke-[3.5px] p-2 rounded-full" />
        </button>
    </form>
</div>
        <div className = "flex items-center space-x-2">

      
        <div className = "w-40 h-auto">

        
             {!user ? (
                <GoogleLogin
                    onSuccess={credentialResponse => {
                        const decoded = jwtDecode(credentialResponse.credential);
                        console.log('User Info:', decoded);
                        setUser(decoded);
                    }}
                    onError={() => {
                        console.log('Login Failed');
                    }}
                />
            ) : (
                <div className="flex items-center space-x-2">
                    <img
                        src={user.picture}
                        alt="Profile"
                        className="w-8 h-8 rounded-full"
                    />
                    <span>{user.name}</span>
                </div>
            )}
            </div>

            <div className="flex items-center justify-self-end space-x-2 max-w-fit">
                <WalletMultiButton className='phantom-button' startIcon={<UserCircleIcon style={{ height: 32, width: 32, color: 'white' }} />}>
                    <span className='text-sm font-medium text-black'>{connected ? truncate(publicKey.toString()) : "Connect Wallet"}</span>
                </WalletMultiButton>
            </div>
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