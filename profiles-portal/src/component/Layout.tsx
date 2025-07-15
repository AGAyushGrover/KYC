'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { ConnectButton } from '@suiet/wallet-kit'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white font-serif flex flex-col">
      <header className="bg-gradient-to-b from-blue-200 to-blue-800 text-white flex items-center justify-between px-6 py-4">
       
        <Link href="/" className="flex items-center text-3xl font-bold">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 mr-2 object-contain"
          />
          Make Your Profile
        </Link>

      
        <div>
          <ConnectButton />
        </div>
      </header>

      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}
