import type { StateStorage } from 'zustand/middleware'
import { encryptStringFast, decryptStringFast, looksEncryptedFast } from './encrypt-cipher'

const isBrowser = typeof window !== 'undefined'

export function encryptedStorageFactory(storage: Storage): StateStorage {
  return {
    getItem: (name) => {
      if (!isBrowser) return null
      const stored = storage.getItem(name)
      if (!stored) return null
      if (!looksEncryptedFast(stored)) return null

      const plain = decryptStringFast(stored)
      return plain ?? null
    },
    setItem: (name, value) => {
      if (!isBrowser) return
      try {
        const cipher = encryptStringFast(value)
        storage.setItem(name, cipher)
      } catch {
        // no-op: 실패 시 저장하지 않음
      }
    },
    removeItem: (name) => {
      if (!isBrowser) return
      storage.removeItem(name)
    },
  }
}

/** SSR 안전 */
export const noopStorage: StateStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
}
