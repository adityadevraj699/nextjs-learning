"use client"
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'


function Header() {
    const {data:session} = useSession();

    const handleSignOut = async () => {
        try {
            await signOut();
            console.log('signed out')
        } catch (error) {
            return error;
        }
    }
  return (
    <div>
        <button onClick={handleSignOut}>Sign Out</button>
        {session ? (
            <div>welcome</div>
        ) : (
            <div>
                <Link href="/login">login</Link>
                <Link href="/signup">signup</Link>
            </div>
        )}
    </div>
  )
}

export default Header
