import { createContext, useContext } from 'react'

import type { HttpClient } from './types'

interface HttpClientContextType {
  client: HttpClient
}

const HttpClientContext = createContext<HttpClientContextType | null>(null)

export function useHttpClientContext(): HttpClientContextType {
  const context = useContext(HttpClientContext)

  if (!context) {
    throw new Error('This context has to be used within <HttpClientContext.Provider>')
  }

  return context
}

export function useHttpClient(): HttpClientContextType['client'] {
  const { client } = useHttpClientContext()
  return client
}

export function HttpClientProvider({
  client,
  children,
}: {
  client: HttpClientContextType['client']
  children: React.ReactNode
}): React.ReactNode {
  return <HttpClientContext.Provider value={{ client }}>{children}</HttpClientContext.Provider>
}
