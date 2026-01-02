'use client'

import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchTopCoins } from '@/services/coingecko'
import Loader from './common/Loader'
import Link from 'next/link'



type SortKey = 'price' | 'marketCap' | 'change'

export default function CoinsTable() {
  const { data: coins = [], isLoading, isError } = useQuery({
    queryKey: ['top-coins'],
    queryFn: fetchTopCoins,
    refetchInterval: 30000,
  })

  const [search, setSearch] = useState('')
  const [sortKey, setSortKey] = useState<SortKey>('marketCap')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filteredAndSortedCoins = useMemo(() => {
    let filtered = coins.filter((coin: any) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    )

    filtered.sort((a: any, b: any) => {
      const map = {
        price: 'current_price',
        marketCap: 'market_cap',
        change: 'price_change_percentage_24h',
      }

      const valueA = a[map[sortKey]]
      const valueB = b[map[sortKey]]

      if (sortOrder === 'asc') return valueA - valueB
      return valueB - valueA
    })

    return filtered
  }, [coins, search, sortKey, sortOrder])

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


  if (isError) return <p className="text-red-500">Failed to load data</p>

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-md px-3 py-2 w-full md:w-64"
        />

        <div className="flex gap-2">
          <Select label="Sort" value={sortKey} onChange={setSortKey} />
          <button
            onClick={() =>
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
            }
            className="border rounded-md px-3 py-2"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Coin</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">24h</th>
              <th className="p-3 text-right">Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedCoins.map((coin: any) => (
              <tr key={coin.id} className="border-t hover:bg-muted/50">
                <td className="p-3">{coin.market_cap_rank}</td>

                <td className="p-3 flex items-center gap-2">
                  <img src={coin.image} className="w-5 h-5" />
                  <span className="font-medium">
                    <Link href={`/coin/${coin.id}`} className="hover:underline">
                      {coin.name}
                    </Link>
                  </span>
                  <span className="text-xs text-muted-foreground uppercase">
                    {coin.symbol}
                  </span>
                </td>

                <td className="p-3 text-right">
                  ${coin.current_price.toLocaleString()}
                </td>

                <td
                  className={`p-3 text-right font-medium ${
                    coin.price_change_percentage_24h >= 0
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>

                <td className="p-3 text-right">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Select({
  value,
  onChange,
  label,
}: {
  value: SortKey
  onChange: (v: SortKey) => void
  label: string
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as SortKey)}
      className="border rounded-md px-3 py-2"
    >
      <option value="marketCap">Market Cap</option>
      <option value="price">Price</option>
      <option value="change">24h Change</option>
    </select>
  )
}


