'use client'
import { useGetTicker } from '@/entities'
import { Dialog } from '@/features/custom-ui'
import { overlay } from '@ci-repo/core-lib/utils'
import { Button } from '@ci-repo/core-ui'

import { useEffect, useState } from 'react'

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

export function ApiView() {
  const [ticker, setTicker] = useState<TickerBody>()
  const { data } = useGetTicker('KRW-BTC')
  useEffect(() => {
    if (data) {
      setTicker(data[0])
    }
  }, [data])
  return (
    <div>
      <div>
        <h3>test-view</h3>
        <Button
          variant={'default'}
          size={'lg'}
        >
          버튼A
        </Button>
        <Button
          variant={'outline'}
          size={'lg'}
        >
          버튼B
        </Button>
        <Button
          variant={'secondary'}
          size={'lg'}
          onClick={() => {
            overlay.open(({ isOpen, close, unmount }) => (
              <Dialog
                open={isOpen}
                onClose={close}
                onExit={unmount}
              />
            ))
          }}
        >
          Open
        </Button>
      </div>
      <div>
        <p>{ticker && ticker.market}</p>
        <p>{ticker && ticker.high_price}</p>
        <p>{ticker && ticker.opening_price}</p>
        <p>{ticker && ticker.trade_date}</p>
      </div>
    </div>
  )
}
