import { ReactNode } from 'react'
import Link from 'next/link'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white font-serif flex flex-col">
      <header className="bg-blue-600 text-white p-3 flex items-center">
        <Link href="/" legacyBehavior>
          <a className="flex items-center text-5xl font-bold">
            <img
              src="/logo.png" // change to your logo file
              alt="Logo"
              className="h-30 w-30 mr-2 object-contain"
            />
            Make Your Profile
          </a>
        </Link>
      </header>
      <main className="flex-1 p-8">{children}</main>
    </div>
  )
}