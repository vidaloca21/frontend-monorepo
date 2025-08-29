import { HttpClient } from '@ci-repo/core-lib/http'

export const httpClient = new HttpClient({
  errorHandler: (error) => {
    console.log(error)
  },
})
