'use client'

import LandingHeader from "@/components/common/LandingPage"

export default function LandingPage() {
  const isLoggedIn = localStorage.getItem('token') 

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 ">
      <LandingHeader  />

      <main className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
          Welcome to CryptoDash
        </h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg md:text-xl">
          Track top cryptocurrencies in real-time with charts and analytics.
        </p>

        {!isLoggedIn ? (
          <div className="mt-8">
            <a
              href="/login"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Get Started
            </a>
          </div>
        ) : (<div className="mt-8"> <a href="/dashboard"  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">Go To Dashbaord</a></div>)}
        <img src="img.png" className="mx-auto my-10" alt="rough_img" />

      </main>
    </div>
  )
}
