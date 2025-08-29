import { Card, CardContent } from '@ci-repo/core-ui'
import Link from 'next/link'

export function LibView() {
  return (
    <div className="w-full p-12">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">packages/core-lib</h2>
      <p className="text-muted-foreground text-xl">@ci-repo/core-lib</p>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">개요</h4>
        <p>프로젝트 전역에서 사용될 http-client, hooks, store, utility 경로입니다.</p>
        <p>프레임워크 비의존 공통 라이브러리 집합입니다.</p>
        <div className="mt-1 font-semibold">구조</div>
        <div></div>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">1. hooks/</h4>
        <div className="mt-3 text-lg font-semibold">용도</div>
        <p>공용 React 훅 수용 경로(예: useIsMounted, useDebounce 등)</p>
        <div className="mt-3 text-lg font-semibold">현황</div>
        <p>실제 구현 없음</p>
        <div className="mt-3 text-lg font-semibold">향후 작업 가이드</div>
        <ul className="ml-6 list-disc">
          <li>DOM/브라우저 의존 훅 ↔ 순수 훅(런타임 불문) 분리 네임스페이스 유지</li>
          <li>공개 훅은 이 경로에서만 export(내부 파일 deep import 금지)</li>
          <li>예: src/hooks/use-disclosure.ts → src/hooks/index.ts에서 export</li>
        </ul>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">2. http/</h4>
        <p className="text-muted-foreground text-lg">axios thin-wrapper + Error/Context</p>
        <div className="mt-3 text-lg font-semibold">자원</div>
        <div className="mt-1 font-semibold">http-client.ts</div>
        <ul className="ml-6 list-disc">
          <li>Axios 인스턴스(withCredentials: true, timeout: 30s) + 요청/응답 인터셉터 구성</li>
          <li>
            {
              'HttpClientImpl 클래스: get/post/patch/delete 메서드 제공 → HttpResponse<T> 형태로 응답 축약(status, statusText, data)'
            }
          </li>
          <li>
            내부 에러는 <span className="font-bold">clientErrorHandler</span>를 통해 로깅 및{' '}
            <span className="font-bold">ApiClientError</span>로 변환 가능
          </li>
        </ul>
        <div className="mt-1 font-semibold">client-error-handler.ts</div>
        <ul className="ml-6 list-disc">
          <li>ApiClientError(code/exception/timestamp) 타입화</li>
          <li>axios 에러/비-axios 에러 구분하여 메시지/스택 로깅, toApiClientError() 변환기 제공</li>
        </ul>
        <div className="mt-1 font-semibold">types.ts</div>
        <ul className="ml-6 list-disc">
          <li>AdapterRequestConfig/Response/Error → axios 타입 별칭</li>
          <li>{'ApiResponse<T>, ApiErrorResponse 등 응답 스키마 타입'}</li>
          <li>{'HttpClient 인터페이스 & HttpResponse<T> 정의'}</li>
        </ul>
        <div className="mt-1 font-semibold">http-client-context.tsx</div>
        <ul className="ml-6 list-disc">
          <li>HttpClientContext + useHttpClient() 훅 + HttpClientProvider (React 컨텍스트)</li>
        </ul>

        <div className="mt-3 text-lg font-semibold">공개 엔트리: index.ts</div>
        <Card>
          <CardContent>
            <p>{"export { HttpClientImpl as HttpClient } from './http-client'"}</p>
            <p>{"export * from './client-error-handler'"}</p>
            <p>{"export * from './types'"}</p>
            <p>{"export { HttpClientProvider, useHttpClientContext, useHttpClient } from './http-client-context'"}</p>
          </CardContent>
        </Card>
        <div className="mt-3 text-lg font-semibold">사용 예시</div>
        <Link
          href={'/example/api'}
          className="text-blue-700 underline underline-offset-4"
        >
          axios & react-query 사용 예시
        </Link>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">3. store/</h4>
        <p className="text-muted-foreground text-lg">Zustand + Immer + Devtools + Persist 암호화</p>
        <div className="mt-3 text-lg font-semibold">자원</div>

        <div className="mt-1 font-semibold">create-store.ts</div>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">보일러플레이트 축약:</span> {'immer + devtools를 체인한 createStore<T>()'}
          </li>
          <li>set(updater)를 내부 innerSet(updater, false)와 호환시키는 호환 어댑터 포함</li>
        </ul>

        <div className="mt-1 font-semibold">create-enc-store.ts</div>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">{'createEncryptedStore<T>:'}</span> persist + 암호화 스토리지 + immer/devtools
            조합
          </li>
          <li>
            <span className="font-bold">옵션:</span>
          </li>
          <ul className="ml-6 list-disc">
            <li>
              <span className="font-bold">name(필수):</span> persist 키<span className="font-bold">storage:</span>{' '}
              {"'session' | 'local' | StateStorage 커스텀 가능(기본: session)"}
            </li>
            <li>
              <span className="font-bold">version:</span> migrate(persisted, version): 마이그레이션 훅
            </li>
            <li>
              {' '}
              <span className="font-bold">merge:</span> rehydrate 시 actions 필드는 현행 인스턴스의 참조 유지(기존 액션
              덮어쓰기 방지)
            </li>
          </ul>
        </ul>

        <div className="mt-1 font-semibold">encrypt-storage-factory.ts</div>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">encryptedStorageFactory(storage: Storage):</span> StateStorage
          </li>
          <li>
            <span className="font-bold">getItem:</span> 암호화 포맷이 아니면 null 반환(평문 차단)
          </li>
          <li>
            <span className="font-bold">setItem:</span> 문자열만 저장(객체는 persist가 JSON stringify)
          </li>
          <li>
            <span className="font-bold">noopStorage:</span> SSR 안전 no-op 구현
          </li>
        </ul>
        <div className="mt-1 font-semibold">encrypt-cipher.ts</div>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">CryptoJS 기반 대칭 암호 + MAC:</span> 라벨 aes-cbc+hmac-sha256/psk, 버전 1
          </li>
          <li>
            <span className="font-bold">키 파생:</span> 고정 시크릿(PSK)에서 enc/mac 키 파생(HMAC-SHA256) – 빠르고 동기
          </li>
          <li>
            <span className="font-bold">시크릿:</span> process.env.NEXT_PUBLIC_ZUSTAND_SECRET (미설정 시 dev 전용 더미
            키 사용) → 운영에서는 반드시 환경변수 주입
          </li>
        </ul>

        <div className="mt-1 font-semibold">types.ts</div>
        <ul className="ml-6 list-disc">
          <li>{'SimpleInit<T>, BaseSetState<T> 등 createStore 내부 호환 타입.'}</li>
        </ul>

        <div className="mt-3 text-lg font-semibold">공개 엔트리: index.ts</div>
        <Card>
          <CardContent>
            <p>{"export { createStore } from './create-store'"}</p>
            <p>{"export { createEncryptedStore } from './create-enc-store'"}</p>
            <p>{"export type { StateCreator } from 'zustand'"}</p>
            <p>{"export type { SimpleInit } from './types'"}</p>
          </CardContent>
        </Card>
        <div className="mt-3 text-lg font-semibold">사용 예시</div>
        <Link
          href={'/example/store'}
          className="text-blue-700 underline underline-offset-4"
        >
          Zustand Store 사용 예시
        </Link>
        <div className="mt-3 text-lg font-semibold">유의사항</div>
        <ul className="ml-6 list-disc">
          <li>반드시 운영에서 NEXT_PUBLIC_ZUSTAND_SECRET 주입</li>
          <li>저장된 값이 평문이면 getItem에서 무시되므로, 마이그레이션 시 암호화 포맷 이관 필요</li>
        </ul>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">4. utils/</h4>
        <div className="mt-3 text-lg font-semibold">용도</div>
        <p>사내에서 많이 쓰는 유틸/오버레이 툴킷을 단일 진입점으로 재노출(의존 버전/교체를 중앙 통제)</p>
        <div className="mt-3 text-lg font-semibold">현황</div>
        <p>외부 overlay-kit 라이브러리 export. 로컬 유틸은 없음</p>
        <Link
          href={'https://github.com/toss/overlay-kit/blob/main/README-ko_kr.md'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline underline-offset-4"
        >
          overlay-kit 공식 문서(toss)
        </Link>
        <div className="mt-3 text-lg font-semibold">향후</div>
        <p>공용 순수 유틸(문자열/숫자/포매터 등)을 이 경로로 추가 가능</p>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">5. 공개 엔트리 & 임포트 규칙</h4>
        <div className="mt-1 font-semibold">src/index.ts가 네임스페이스 형태로 공개</div>
        <Card>
          <CardContent>
            <p>{"export * as hooks from './hooks'"}</p>
            <p>{"export * as http from './http'"}</p>
            <p>{"export * as utils from './utils'"}</p>
            <p>{"export * as store from './store'"}</p>
          </CardContent>
        </Card>
        <div className="mt-1 font-semibold">
          네임스페이스 or 서브패스만 사용 권장 (내부 폴더 구조 변경 가능성 → 공개 표면 안정성 확보 위함)
        </div>
        <Card>
          <CardContent>
            <p>{"import { http, store } from '@ci-repo/corelib'                 // 네임스페이스"}</p>
            <p>{"import type { HttpResponse } from '@ci-repo/corelib/http'      // 서브패스"}</p>
            <p>{"import { createEncryptedStore } from '@ci-repo/corelib/store'  // 서브패스"}</p>
          </CardContent>
        </Card>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">6. 빌드/설정 포인트</h4>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">ESM 기준:</span> 소비자(Next 15/Vite)가 친화적
          </li>
          <li>
            <span className="font-bold">Turborepo outputs:</span> 번들 배포 시 dist/**를 turbo.json outputs에 포함해야
            캐시 적중
          </li>
          <li>
            <span className="font-bold">ESLint:</span> 루트 eslint.config.js는 외부 프리셋(@dexp/eslint-config) 사용
          </li>
          <li>
            <span className="font-bold">환경변수:</span> NEXT_PUBLIC_ZUSTAND_SECRET(암호화 PSK) — dev 더미키는 운영 금지
          </li>
        </ul>
      </div>
    </div>
  )
}
