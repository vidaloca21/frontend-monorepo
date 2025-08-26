import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export type AdapterRequestConfig<T = any> = AxiosRequestConfig<T>

export type AdapterResponse<T = any, D = any> = AxiosResponse<T, D>

export type AdapterError<T = any, D = any> = AxiosError<T, D>

export type ApiResponse<T = undefined> = T extends undefined
  ? {
      code: string
      message: string
    }
  : {
      code: string
      message: string
      data: T
    }

export type ApiErrorResponse = {
  code: string
  message: string
  exception: string
  timestamp: string
}

export type HttpResponse<T = ApiResponse> = Pick<AdapterResponse<T>, 'status' | 'statusText' | 'data'>
export type HttpError<T = ApiErrorResponse> = AdapterError<T>

type HttpClientMethod = <T = any>(path: string, params?: any, config?: AdapterRequestConfig) => Promise<HttpResponse<T>>
// type HttpClientMethod = <T = any>(path: string, params?: any, config?: AdapterRequestConfig) => Promise<ApiResponse<T>>

export interface HttpClient {
  get: HttpClientMethod
  post: HttpClientMethod
  patch: HttpClientMethod
  delete: HttpClientMethod
}
