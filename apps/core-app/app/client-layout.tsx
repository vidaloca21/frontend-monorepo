'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HttpClientProvider } from '@ci-repo/corelib/http'
import { httpClient } from '@/shared'
import { queryClient } from '@/application'
import { OverlayProvider } from '@ci-repo/corelib/utils'

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <OverlayProvider>
      <HttpClientProvider client={httpClient}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          {children}
        </QueryClientProvider>
      </HttpClientProvider>
    </OverlayProvider>
  )
}
