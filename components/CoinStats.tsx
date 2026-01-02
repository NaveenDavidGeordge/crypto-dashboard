export default function CoinStats({ coin }: any) {
  const m = coin.market_data

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <Stat label="Market Cap" value={`$${m.market_cap.usd.toLocaleString()}`} />
      <Stat label="24h High" value={`$${m.high_24h.usd.toLocaleString()}`} />
      <Stat label="24h Low" value={`$${m.low_24h.usd.toLocaleString()}`} />
      <Stat label="Circulating Supply" value={m.circulating_supply.toLocaleString()} />
      <Stat label="Total Supply" value={m.total_supply?.toLocaleString() || 'N/A'} />
      <Stat label="24h Change" value={`${m.price_change_percentage_24h.toFixed(2)}%`} />
    </div>
  )
}

function Stat({ label, value }: any) {
  return (
    <div className="p-4 rounded-lg border bg-background">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-semibold mt-1">{value}</p>
    </div>
  )
}
