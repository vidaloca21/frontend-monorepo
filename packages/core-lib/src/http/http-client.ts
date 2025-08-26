import axios from 'axios'
import type { HttpClient, HttpResponse } from './types'
import { ApiClientErrorHandler, clientErrorHandler } from './client-error-handler'

const clientInstance = axios.create({
  headers: {
    Accept: 'application/json,',
    'Content-Type': 'application/json',
  },
  params: {}, // URL 에 Query String 으로 전송 될 URL 파라미터
  data: {}, // Request Body 로 전송될 데이터. POST, PUT, PATCH, DELETE 메소드에서만 적용 가능
  timeout: 30000,
  withCredentials: true,
})

clientInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error: unknown) => {
    clientErrorHandler.log(error)
    return Promise.reject(error)
  },
)

clientInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error: unknown) => {
    clientErrorHandler.log(error)
    return Promise.reject(error)
  },
)

export class HttpClientImpl implements HttpClient {
  private errorHandler?: ApiClientErrorHandler

  constructor(config?: { errorHandler?: ApiClientErrorHandler }) {
    this.errorHandler = config?.errorHandler
  }

  private handleError(error: unknown) {
    if (this.errorHandler) {
      this.errorHandler(clientErrorHandler.toApiClientError(error))
    }

    return Promise.reject(error)
  }

  private handleResponse<T>(response: HttpResponse<T>) {
    return {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    }
    // return response.data
  }

  async get<T>(path: string, params?: any, config?: any) {
    try {
      const response = await clientInstance.get<T>(path, {
        ...config,
        params,
      })
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }

  async post<T>(path: string, params?: any, config?: any) {
    try {
      const response = await clientInstance.post<T>(path, params, config)
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }

  async patch<T>(path: string, params?: any, config?: any) {
    try {
      const response = await clientInstance.patch<T>(path, { ...params }, { ...config })
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }

  async delete<T>(path: string, params?: any, config?: any) {
    try {
      const response = await clientInstance.delete<T>(path, {
        ...config,
        params,
      })
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }
}
