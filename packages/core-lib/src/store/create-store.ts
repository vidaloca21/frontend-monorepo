import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { SimpleInit, BaseSetState } from './types'

export function createStore<T extends object>(init: SimpleInit<T>, name?: string) {
  // ⬇️ 인라인 어댑트(3줄): set(updater) -> innerSet(updater, false)
  const compat = ((innerSet: BaseSetState<T>, get: () => T) => init((u) => (innerSet as any)(u, false), get)) as any
  const withImmer = immer(compat) as any
  const withAll = devtools(withImmer, name ? { name } : undefined) as any
  return create<T>()(withAll)
}
