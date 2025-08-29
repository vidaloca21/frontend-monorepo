'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { HttpClientProvider } from '@ci-repo/core-lib/http'
import { httpClient } from '@/shared'
import { queryClient } from '@/application'
import { OverlayProvider } from '@ci-repo/core-lib/utils'
import { SidebarProvider } from '@ci-repo/core-ui'
import { AppSidebar } from '@/widget'

export default function ClientLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <OverlayProvider>
      <HttpClientProvider client={httpClient}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={true} />
          <SidebarProvider>
            <AppSidebar />
            <main>{children}</main>
          </SidebarProvider>
        </QueryClientProvider>
      </HttpClientProvider>
    </OverlayProvider>
  )
}
