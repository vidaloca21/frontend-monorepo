type SimpleInit<T extends object> = (set: (updater: ((draft: T) => void) | Partial<T> | T) => void, get: () => T) => T
type BaseSetState<T extends object> = (
  partial: T | Partial<T> | ((state: T) => T | Partial<T>),
  replace?: boolean,
) => void

export type { SimpleInit, BaseSetState }
