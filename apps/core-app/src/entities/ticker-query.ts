import { httpClient } from '@/shared'
import { useQuery } from '@tanstack/react-query'

type TickerBody = {
  market: string
  trade_date: string
  trade_time: string
  trade_date_kst: string
  trade_time_kst: string
  trade_timestamp: number
  opening_price: number
  high_price: number
  low_price: number
  trade_price: number
  prev_closing_price: number
  change: string
  change_price: number
  change_rate: number
  signed_change_price: number
  signed_change_rate: number
  trade_volume: number
  acc_trade_price: number
  acc_trade_price_24h: number
  acc_trade_volume: number
  acc_trade_volume_24h: number
  highest_52_week_price: number
  highest_52_week_date: number
  lowest_52_week_price: number
  lowest_52_week_date: string
  timestamp: number
}

export function useGetTicker(market: string) {
  return useQuery({
    queryKey: ['ticker', market],
    queryFn: async () => {
      const response = await httpClient.get<TickerBody[]>('/api/ticker?markets=KRW-BTC')
      return response.data
    },
  })
}
