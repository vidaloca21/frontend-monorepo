'use client'

import { useBearStore, useEncUserActions, useEncUserStore, useUserActions, useUserStore } from '@/entities/store'

export function StoreView() {
  const user = useUserStore((state) => state.user)
  const { setFirstName, setLastName } = useUserActions()
  const bears = useBearStore((state) => state.bears)
  const { addABear, clear } = useBearStore((state) => state.actions)

  const userInfo = useEncUserStore((state) => state.user)
  const { setFirstName: setFName, setLastName: setLName, clearName } = useEncUserActions()

  return (
    <div>
      <div>
        <h1>useUserStore: immer 적용한 일반 store</h1>
        <div>user: {user.name.firstName + ', ' + user.name.lastName}</div>
        <div>
          <input
            type="text"
            value={user.name.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            value={user.name.lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div>
        <h1>useBearStore: persist + immer 적용한 암호화 store</h1>
        <div>
          <div>bears: {bears}</div>
          <button
            className="bg-emerald-900"
            onClick={addABear}
          >
            addABear
          </button>
          <button
            className="bg-orange-600"
            onClick={clear}
          >
            clear
          </button>
        </div>
      </div>
      <div>
        <h1>useEncUserStore: ebcrypted store</h1>
        <div>user: {userInfo.name.firstName + ', ' + userInfo.name.lastName}</div>
        <div>
          <input
            type="text"
            value={userInfo.name.firstName}
            onChange={(e) => setFName(e.target.value)}
          />
          <input
            type="text"
            value={userInfo.name.lastName}
            onChange={(e) => setLName(e.target.value)}
          />
        </div>
        <button onClick={clearName}>clear</button>
      </div>
    </div>
  )
}
