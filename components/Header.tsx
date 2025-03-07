"use client";
import React from 'react'
import { ClerkLoaded, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import { PackageIcon, TrolleyIcon } from '@sanity/icons';

function Header() {
    const { user } = useUser();

    const createClerkPasskey = async () => {
        try {
            const response = await user?.createPasskey();
            if (response) {
                alert('Passkey created successfully');
            }
            console.log(response);
        } catch (error) {
            console.error("Error:", JSON.stringify(error, null, 2));
        }
    }

  return (
    <header className='flex flex-wrap justify-between items-center px-4 py-2'>
        <div className='flex w-full flex-wrap justify-between items-center '>
            <Link href='/' className='text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:mx-0'>
            Sisimatt
            </Link>
            <Form action='/search' className='sm:w-auto sm:mx-4 mt-2 sm:mt-0'>
                <input type='text'
                name='query'
                placeholder='Search for products'
                className='bg-gray-100 test-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focuse:ring-blue-500 focus:ring-opacity-50 bprder w-full max-w-4xl'
                />
                <button type='submit' className=' '>Search</button>
            </Form>
            <div className='flex items-center space-x-4 mt-4 sm:mt-0'>
               <Link href='/cart' className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 text-white font-bold bg-blue-500 hover:bg-blue-700 hover:opacity-50  py-2 px-4  rounded cursor-pointer'>
               <TrolleyIcon className='w-6 h-6' />
               {/* Span item couunt once global state is implemented */}
               <span>Cart</span>
                </Link>

                {/* User area */}
                <ClerkLoaded>
                    {user && (
                        <Link
                            href='/orders'
                            className='flex-1 relative flex justify-center sm:justify-start sm:flex-none items-center space-x-2 text-white font-bold bg-blue-500 hover:bg-blue-700 hover:opacity-50  py-2 px-4  rounded cursor-pointer'
                        >
                            <PackageIcon className='w-6 h-6' />
                            <span>My Orders</span>
                        </Link>
                    )}

                    {user ? (
                        <div className='flex item-center space-x-2'>
                            <UserButton />
                            <div className='hidden sm:block text-xs'>
                                <p className='text-gray-400'>Wellcom Back</p>
                                <p className='font-bold'>{user.fullName}</p>
                            </div>
                        </div>
                        ) : (
                            <SignInButton mode='modal' />
                        )}
                        {/* passkey fuctionality */}
                        {user?.passkeys.length === 0 && (
                            <button
                                onClick={createClerkPasskey}
                                className='bg-white hover:bg-blue-700 hover:text-white aniimate-pulse text-blue-500 font-bold py-2 px-4 rounded border-blue-300 border'>
                                    Create Passkey Now
                                </button>
                            )}
                </ClerkLoaded>
            </div>
        </div>
    </header>
  )
}

export default Header