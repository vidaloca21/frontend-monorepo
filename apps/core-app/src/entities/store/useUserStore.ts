import { createStore } from '@ci-repo/corelib/store'

type User = { name: { firstName: string; lastName: string } }
type UserState = { user: User }
type UserActions = {
  actions: {
    setFirstName: (name: string) => void
    setLastName: (name: string) => void
  }
}
type UserStore = UserState & UserActions

export const useUserStore = createStore<UserStore>((set, get) => ({
  user: { name: { firstName: 'Lionel', lastName: 'Messi' } },
  actions: {
    getName: () => get().user.name,
    setFirstName: (name) =>
      set((s) => {
        s.user.name.firstName = name
      }),
    setLastName: (name) =>
      set((s) => {
        s.user.name.lastName = name
      }),
  },
}))

export const useUserActions = () => useUserStore((state: UserActions) => state.actions)
