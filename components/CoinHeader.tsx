export default function CoinHeader({ coin }: any) {
  return (
    <div className="flex items-center gap-4">
      <img src={coin.image.large} className="w-12 h-12" />
      <div>
        <h1 className="text-2xl font-bold">
          {coin.name}
          <span className="uppercase text-muted-foreground ml-2 text-sm">
            {coin.symbol}
          </span>
        </h1>
        <p className="text-muted-foreground">
          ${coin.market_data.current_price.usd.toLocaleString()}
        </p>
      </div>
    </div>
  )
}
