'use client'
import { Card, CardHeader, CardTitle, CardContent } from '@ci-repo/core-ui'
import { useUserActions, useUserStore } from '@/entities/store'

export function StoreView() {
  const user = useUserStore((state) => state.user)
  const { setFirstName, setLastName } = useUserActions()

  return (
    <div className="w-full p-12">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">상태 관리</h2>
      <p className="text-muted-foreground text-xl">@ci-repo/core-lib에서 제공하는 상태 관리 예제</p>

      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">1.</h4>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">의존성:</span> zustand, immer, crypto-js
          </li>
          <li>
            <span className="font-bold">보일러플레이트 축소:</span> immer, devtools, persist 조합을 템플릿화
          </li>
          <li>
            <span className="font-bold">일관된 패턴:</span> actions 네임스페이스, 초기화/마이그레이션, 스토리지
            선택(session/local/custom)을 표준화
          </li>
          <li>
            <span className="font-bold">보안 옵션:</span> 민감 데이터는 createEncryptedStore로 암호화 저장
          </li>
        </ul>
      </div>

      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">2. API 요약</h4>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{'createStore<T>(init, name?)'}</h4>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">용도:</span> 휘발성/비영속 상태. immer + devtools 세팅 포함
          </li>
          <li>
            <span className="font-bold">시그니처:</span> {'(set, get) => T 형태의 초기화 함수를 수신'}
          </li>
          <li>
            <span className="font-bold">옵션:</span> name(devtools 라벨)
          </li>
        </ul>
        <div className="pt-6">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            {'createEncryptedStore<T>(init, options)'}
          </h4>
          <ul className="ml-6 list-disc">
            <li>
              <span className="font-bold">용도:</span> 암호화 persist 상태(세션/로컬 저장 지원).
            </li>
            <li>
              <span className="font-bold">옵션:</span>
            </li>
            <ul className="ml-6 list-disc">
              <li>
                <span className="font-bold">name:</span> 용도: 암호화 persist 상태(세션/로컬 저장 지원).
              </li>
              <li>
                <span className="font-bold">storage:</span>
                {"'session' | 'local' | StateStorage — 기본 session"}
              </li>
              <li>
                <span className="font-bold">version:</span> number — 상태 스키마 버전
              </li>
              <li>
                <span className="font-bold">migrate:</span>{' '}
                {'(persisted: unknown, version: number) => T | Promise<T> — 마이그레이션 훅'}
              </li>
              <li>
                <span className="font-bold">구현 포인트:</span> rehydrate 시 actions는 현행 인스턴스를 유지하여, 함수
                참조 깨짐을 예방
              </li>
            </ul>
          </ul>
        </div>
      </div>

      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">3. 사용 예시</h4>
        <h4 className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">휘발성 카운터 (createStore)</h4>
        <Card>
          <CardHeader>
            <CardTitle>code</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p>{"import { createStore } from '@ci-repo/core-lib/store'"}</p>
              <p className="mt-4">{'type User = { name: { firstName: string; lastName: string } }'}</p>
              <p>{'type UserState = { user: User }'}</p>
              <p>{'type UserActions = {'}</p>
              <p className="ml-4">{'  actions: {'}</p>
              <p className="ml-8">{'    setFirstName: (name: string) => void'}</p>
              <p className="ml-8">{'    setLastName: (name: string) => void'}</p>
              <p className="ml-4">{'  }'}</p>
              <p>{'}'}</p>
              <p>{'type UserStore = UserState & UserActions'}</p>
              <p className="mt-4">{'export const useUserStore = createStore<UserStore>((set) => ({'}</p>
              <p className="ml-4">{"  user: { name: { firstName: 'Lionel', lastName: 'Messi' } },"}</p>
              <p className="ml-4">{'  actions: {'}</p>
              <p className="ml-8">{'    setFirstName: (name) =>'}</p>
              <p className="ml-12">{'      set((s) => {'}</p>
              <p className="ml-16">{'        s.user.name.firstName = name'}</p>
              <p className="ml-12">{'      }),'}</p>
              <p className="ml-8">{'    setLastName: (name) =>'}</p>
              <p className="ml-12">{'      set((s) => {'}</p>
              <p className="ml-16">{'        s.user.name.lastName = name'}</p>
              <p className="ml-12">{'      }),'}</p>
              <p className="ml-4">{'  },'}</p>
              <p>{'}))'}</p>
              <p className="mt-4">
                {'export const useUserActions = () => useUserStore((state: UserActions) => state.actions)'}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>view</CardTitle>
          </CardHeader>
          <CardContent>
            <div>user: {user.name.firstName + ', ' + user.name.lastName}</div>
            <div>
              <div className="flex">
                <label
                  htmlFor="firstName"
                  className="w-20"
                >
                  firstName:
                </label>
                <input
                  name="firstName"
                  className="border-2"
                  type="text"
                  value={user.name.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="flex">
                <label
                  htmlFor="lastName"
                  className="w-20"
                >
                  lastName:
                </label>
                <input
                  name="lastName"
                  className="border-2"
                  type="text"
                  value={user.name.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
