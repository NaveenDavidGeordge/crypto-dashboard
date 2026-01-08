'use client'

import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { fetchCoinDetails, fetchCoinChart } from '@/services/coingecko'
import CoinHeader from '@/components/CoinHeader'
import CoinStats from '@/components/CoinStats'
import CoinChart from '@/components/CoinChart'
import LandingHeader from '@/components/common/LandingPage'
import Loader from '@/components/common/Loader'

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


  return (
    <>
    <LandingHeader />
    {isLoading ? <div className="space-y-6 p-6">
            <div className="flex items-center gap-4">
              <Loader className="w-12 h-12 rounded-full" />
              <Loader className="w-48 h-6" />
            </div>
            </div>
      
     : 
    
          <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-900">
            <CoinHeader coin={coin} />
            <CoinChart data={chart} />
            <CoinStats coin={coin} />
          </div>
    }
    </>
  )
}
