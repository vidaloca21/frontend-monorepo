import { HttpClient } from '@ci-repo/corelib/http'

export const httpClient = new HttpClient({
  errorHandler: (error) => {
    console.log(error)
  },
})
