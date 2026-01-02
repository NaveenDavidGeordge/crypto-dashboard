'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchCoinDetails, fetchCoinChart } from '@/services/coingecko'
import CoinHeader from '@/components/CoinHeader'
import CoinStats from '@/components/CoinStats'
import CoinChart from '@/components/CoinChart'

export default function CoinDetailPage() {
  const { id } = useParams<{ id: string }>()

  const { data: coin, isLoading } = useQuery({
    queryKey: ['coin', id],
    queryFn: () => fetchCoinDetails(id),
  })

  const { data: chart } = useQuery({
    queryKey: ['coin-chart', id],
    queryFn: () => fetchCoinChart(id),
  })

  if (isLoading) return <div className="p-6">Loading...</div>

  return (
    <div className="p-6 space-y-6">
      <CoinHeader coin={coin} />
      <CoinChart data={chart} />
      <CoinStats coin={coin} />
    </div>
  )
}
