'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function CoinChart({ data }: any) {
  if (!data) return null

  const chartData = data.prices.map((p: any) => ({
    time: new Date(p[0]).toLocaleDateString(),
    price: p[1],
  }))

  return (
    <div className="h-64 w-full rounded-lg border p-4">
      <ResponsiveContainer>
        <LineChart data={chartData}>
          <XAxis dataKey="time" hide />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
