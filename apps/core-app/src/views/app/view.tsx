import fsd from '../../../public/image-fsd.png'
import Link from 'next/link'
import Image from 'next/image'

export function AppView() {
  return (
    <div className="w-full p-12">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">apps/core-app</h2>
      <p className="text-muted-foreground text-xl">@apps/core-app</p>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">개요</h4>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">런타임:</span> Next.js 15 (App Router), React 19, TypeScript
          </li>
          <li>
            <span className="font-bold">디자인/스타일:</span> Tailwind CSS v4 + @ci-repo/coreui(토큰/컴포넌트)
          </li>
          <li>
            <span className="font-bold">상태:</span> React Query(서버 상태), Zustand(클라 상태)
          </li>
          <li>
            <span className="font-bold">핵심 패턴:</span>
          </li>
          <ul className="ml-6 list-disc">
            <li>FSD(entities → features → widgets → views)로 기능/화면 레이어링</li>
            <li>ClientLayout에서 전역 Provider/레이아웃(UI 오버레이/사이드바/QueryClient/HTTP) 관리</li>
          </ul>
        </ul>
      </div>

      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">1. FSD 아키텍처</h4>
        <ul className="ml-6 list-disc">
          <li>Next.js의 pages 폴더와 FSD의 pages layer의 충돌을 방지하기 위해, src/pages → src/views로 이름 변경</li>
        </ul>
        <Image
          src={fsd}
          alt="fsd-image"
          width={700}
          height={389}
        />
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
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">2. ClientLayout (전역 UI/Provider)</h4>
        <p className="text-muted-foreground">app/client-layout.tsx</p>
        <div className="mt-1 font-semibold">역할:</div>
        <ul className="ml-6 list-disc">
          <li>전역 오버레이/모달 루트(OverlayProvider)</li>
          <li>전역 HTTP 클라이언트 주입(HttpClientProvider, httpClient 인스턴스)</li>
          <li>React Query 캐시/옵션 제공(QueryClientProvider + Devtools)</li>
          <li>사이드바 레이아웃/상태(SidebarProvider + AppSidebar)</li>
        </ul>
        <div className="mt-1 font-semibold">패턴:</div>
        <ul className="ml-6 list-disc">
          <li>route/page/feature 어디서나 동일한 전역 레이어가 보장되어, 뷰는 기능 구현에만 집중</li>
        </ul>
      </div>
    </div>
  )
}
