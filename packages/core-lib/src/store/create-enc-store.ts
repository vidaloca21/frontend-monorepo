import { create } from 'zustand'
import { devtools, persist, createJSONStorage, type PersistOptions, type StateStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import type { SimpleInit, BaseSetState } from './types'
import { encryptedStorageFactory, noopStorage } from './encrypt-storage-factory'

type StripActions<T> = T extends { actions: any } ? Omit<T, 'actions'> : T
type StorageKind = 'session' | 'local' | StateStorage

export type CreateEncryptedOptions<T extends object> = {
  name: string
  storage?: StorageKind
  version?: number
  migrate?: (persistedState: unknown, version: number) => T | Promise<T>
}

const isBrowser = typeof window !== 'undefined'
function resolveStorage(kind?: StorageKind): StateStorage {
  if (!isBrowser) return noopStorage
  if (!kind || kind === 'session') return encryptedStorageFactory(sessionStorage)
  if (kind === 'local') return encryptedStorageFactory(localStorage)
  return kind
}

export function createEncryptedStore<T extends object>(init: SimpleInit<T>, opts: CreateEncryptedOptions<T>) {
  type P = StripActions<T>
  const { name, storage, version, migrate } = opts

  const storageImpl = createJSONStorage<P>(() => resolveStorage(storage))

  // ⬇️ 인라인 어댑트(3줄)
  const compat = ((innerSet: BaseSetState<T>, get: () => T) => init((u) => (innerSet as any)(u, false), get)) as any
  const withImmer = immer(compat) as any

  // actions 자동 제외
  const partialize = (s: T): P => {
    const out: any = { ...(s as any) }
    if ('actions' in out) delete out.actions
    return out as P
  }

  // 사용자가 T를 반환해도 P로 변환
  const migrateAdapter: PersistOptions<T, P>['migrate'] | undefined = migrate
    ? async (ps, v) => partialize(await migrate(ps, v))
    : undefined

  const persistOptions: PersistOptions<T, P> = {
    name,
    storage: storageImpl,
    version,
    migrate: migrateAdapter,
    partialize,
    // rehydrate 시 현재 actions 참조 보존
    merge: (persisted, current) => {
      const p = persisted as P
      const c = current as any
      const merged: any = { ...c, ...p }
      if ('actions' in c) merged.actions = c.actions
      return merged as T
    },
  }

  const withPersist = persist(withImmer, persistOptions) as any
  const withAll = devtools(withPersist, { name }) as any
  return create<T>()(withAll)
}
