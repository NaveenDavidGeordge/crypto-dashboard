'use client'

import Link from 'next/link'
import { useState,  useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ThemeToggle } from './theme-toggle'

export default function LandingHeader() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token') 
    localStorage.removeItem('user') 

    router.push('/login')
  }
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'))
  }, [])

  
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            CryptoDash
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-2 p-2 rounded-md focus:outline-none bg-gray-200 dark:bg-gray-700"
          >
            {menuOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pt-2 pb-4 space-y-2">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="w-full block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  )
}
