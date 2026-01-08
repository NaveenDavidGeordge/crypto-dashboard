'use client'

import useSWR from 'swr'
import { fetchTopCoins } from '@/services/coingecko'
import { useState } from 'react'
import CoinsTable from '@/components/CoinsTable'
import Loader from '@/components/common/Loader'
import LandingHeader from '@/components/common/LandingPage'


export default function DashboardPage() {
  const { data, error, isLoading } = useSWR(
    'top-coins',
    fetchTopCoins,
    { refreshInterval: 30000 } 
  )
  const user = JSON.parse(localStorage.getItem('user') || 'null')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'gainers' | 'losers'>('all')

  if (isLoading) return(
      <div className="space-y-6 p-6">
        <div className="flex items-center gap-4">
          <Loader className="w-12 h-12 rounded-full" />
          <Loader className="w-48 h-6" />
        </div>
  
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Loader key={i} className="h-20 rounded-lg" />
          ))}
        </div>
  
        <Loader className="h-64 w-full rounded-lg" />
      </div>
    )
  if (error){ 
    return <p className="p-6 text-red-500">Failed to load data</p>
  }

  let coins = data.filter((coin: any) =>
    coin.name.toLowerCase().includes(search.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(search.toLowerCase())
  )

  if (filter === 'gainers') {
    coins = coins.filter((c: any) => c.price_change_percentage_24h > 0)
  }

  if (filter === 'losers') {
    coins = coins.filter((c: any) => c.price_change_percentage_24h < 0)
  }

  return (<>
    <LandingHeader  />
    <div className="p-6 bg-gray-50 dark:bg-gray-900">
      <div className=''>
       {user && <p className="text-sm text-muted-foreground">Welcome back, {user?.username}</p>} 
       <h1 className="mb-4 text-2xl font-semibold">Crypto Market</h1>
        <div className="flex gap-2">
        </div>
      </div>
      <CoinsTable />
      <p className="mt-2 text-xs text-muted-foreground">
        Auto refresh every 30 seconds
      </p>
    </div>
    </>
  )
}
