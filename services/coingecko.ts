import axios from 'axios'

export const coingecko = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 10000,
})

export const fetchTopCoins = async () => {
  const res = await coingecko.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: 'market_cap_desc',
      per_page: 100,
      page: 1,
      sparkline: false,
      price_change_percentage: '24h',
    },
  })

  return res.data
}

export const fetchCoinDetails = async (id: string) => {
  const res = await coingecko.get(`/coins/${id}`, {
    params: {
      localization: false,
      tickers: false,
      market_data: true,
      community_data: false,
      developer_data: false,
    },
  })
  return res.data
}

export const fetchCoinChart = async (id: string) => {
  const res = await coingecko.get(`/coins/${id}/market_chart`, {
    params: {
      vs_currency: 'usd',
      days: 7,
    },
  })
  return res.data
}
