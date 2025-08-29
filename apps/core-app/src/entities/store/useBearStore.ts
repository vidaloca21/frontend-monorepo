import { createEncryptedStore } from '@ci-repo/core-lib/store'

type BearState = {
  bears: number
}

type BearActions = {
  actions: {
    addABear: () => void
    clear: () => void
  }
}

type BearStore = BearState & BearActions

export const useBearStore = createEncryptedStore<BearStore>(
  (set, get) => ({
    bears: 0,
    actions: {
      addABear: () =>
        set((state: BearState) => {
          state.bears = get().bears + 1
        }),
      clear: () => set(() => ({ bears: 0 })),
    },
  }),
  {
    name: 'bear-storage',
  },
)
