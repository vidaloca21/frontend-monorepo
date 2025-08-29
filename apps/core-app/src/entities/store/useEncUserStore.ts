import { createEncryptedStore } from '@ci-repo/core-lib/store'

type User = { name: { firstName: string; lastName: string } }

type UserState = { user: User }
type UserActions = {
  actions: {
    setFirstName: (name: string) => void
    setLastName: (name: string) => void
    clearName: () => void
  }
}
type UserStore = UserState & UserActions

export const useEncUserStore = createEncryptedStore<UserStore>(
  (set) => ({
    user: { name: { firstName: 'Lionel', lastName: 'Messi' } },
    actions: {
      setFirstName: (name) =>
        set((s) => {
          s.user.name.firstName = name
        }),
      setLastName: (name) =>
        set((s) => {
          s.user.name.lastName = name
        }),
      clearName: () => set({ user: { name: { firstName: '', lastName: '' } } }),
    },
  }),
  { name: 'user-storage' }, // devtools는 자동 on, name=키
)

export const useEncUserActions = () => useEncUserStore((state) => state.actions)
