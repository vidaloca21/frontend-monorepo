import { Card, CardContent } from '@ci-repo/core-ui'
import Link from 'next/link'

export function AppView() {
  return (
    <div className="w-full p-12">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">apps/core-app</h2>
      <p className="text-muted-foreground text-xl">@apps/core-app</p>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">개요</h4>
        <p>실제 서비스를 위한 application 경로입니다.</p>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">2. FSD 아키텍처</h4>
        <ul className="ml-6 list-disc">
          <li>리스트아이템</li>
          <li>
            <span className="font-bold">볼드:</span> 리스트아이템
          </li>
        </ul>
        <div className="mt-2">
          <Link
            href={'https://feature-sliced.design/kr/docs/get-started/overview'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline underline-offset-4"
          >
            공식 문서 - feature-sliced.design
          </Link>
        </div>
        <div className="mt-2">
          <Link
            href={'https://emewjin.github.io/feature-sliced-design/'}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline underline-offset-4"
          >
            (번역) 기능 분할 설계 - 최고의 프런트엔드 아키텍처
          </Link>
        </div>
      </div>

      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">2. ClientLayout</h4>
        <p className="text-muted-foreground">app/client-layout.tsx</p>
        <p>
          서버 레이아웃(app/layout.tsx)은 최대한 가볍게, 클라이언트 전용 레이아웃에서 상호작용과 전역 UI를 관리합니다.
        </p>
        <div className="mt-3 text-lg font-semibold">역할</div>
        <ul className="ml-6 list-disc">
          <li>전역 모달/토스트/오버레이의 루트 컨테이너 제공(OverlayProvider 등)</li>
          <li>React Query/Zustand Provider 등 클라이언트 전용 Provider 계층화</li>
        </ul>
      </div>

      <Card>
        <CardContent></CardContent>
      </Card>

      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">제목</h4>
        <div className="mt-3 text-lg font-semibold">소제목</div>
        <div className="mt-1 font-semibold">제일작은제목</div>
      </div>
      <ul className="ml-6 list-disc">
        <li>리스트아이템</li>
        <li>
          <span className="font-bold">볼드:</span> 리스트아이템
        </li>
      </ul>
    </div>
  )
}
