import { AxiosError, isAxiosError } from 'axios'
import { ApiErrorResponse } from './types'

export class ApiClientError extends Error {
  code = ''
  exception = ''
  timestamp = ''

  constructor(errorResponse: ApiErrorResponse) {
    console.error('errorResponse', errorResponse)

    super(errorResponse.message)
    this.name = 'ApiClientError'
    this.code = errorResponse.code
    this.exception = errorResponse.exception
    this.timestamp = errorResponse.timestamp
  }
}

export type ApiClientErrorHandler = (error: ApiClientError) => void

interface ErrorWithMessage {
  message: string
}

interface ClientErrorHandler {
  isErrorWithMessage: (error: unknown) => error is ErrorWithMessage
  isClientError: <T = any, D = any>(error: unknown) => error is AxiosError<T, D>
  isApiClientError: (error: unknown) => error is ApiClientError
  toErrorWithMessage: (maybeError: unknown) => ErrorWithMessage
  toApiClientError: (maybeError: unknown) => ApiClientError
  getErrorMessage: (error: unknown) => string
  log: (error: unknown) => void
}

export const clientErrorHandler: ClientErrorHandler = {
  isErrorWithMessage(error): error is ErrorWithMessage {
    return (
      typeof error === 'object' &&
      error !== null &&
      'message' in error &&
      typeof (error as Record<string, unknown>).message === 'string'
    )
  },
  isClientError: isAxiosError,
  isApiClientError(error): error is ApiClientError {
    return error instanceof ApiClientError
  },
  toErrorWithMessage(maybeError) {
    if (this.isErrorWithMessage(maybeError)) return maybeError

    try {
      return new Error(JSON.stringify(maybeError))
    } catch {
      // 순환 참조와 같이 maybeError를 stringify하는 과정에서 발생하는
      // 에러에 대해 fallback을 제공한다
      return new Error(String(maybeError))
    }
  },
  toApiClientError(maybeError) {
    if (this.isApiClientError(maybeError)) return maybeError

    if (this.isClientError<ApiErrorResponse>(maybeError) && maybeError.response) {
      return new ApiClientError(maybeError.response.data)
    }

    const message = this.getErrorMessage(maybeError)
    return new ApiClientError({
      message: message,
      code: 'UNKNOWN',
      exception: 'UnknownException',
      timestamp: new Date().toISOString(),
    })
  },
  getErrorMessage(error) {
    return this.toErrorWithMessage(error).message
  },
  log(error) {
    if (this.isClientError(error)) {
      if (error.response) {
        // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
        console.error(error.response.status)
        console.error(error.response.headers)
        console.error(error.response.data)
      } else if (error.request) {
        // 요청이 이루어 졌으나 응답을 받지 못했습니다.
        // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는 Node.js의 http.ClientRequest 인스턴스입니다.
        console.error(error.request)
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
        console.error('HTTP error', error.message)
      }
    } else if (this.isApiClientError(error)) {
      console.error(error.code)
      console.error(error.message)
    } else {
      console.error('Unknown error', this.getErrorMessage(error))
    }
  },
}
