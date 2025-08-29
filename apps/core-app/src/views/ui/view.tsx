import { Card, CardContent } from '@ci-repo/core-ui'

export function UIView() {
  return (
    <div className="w-full p-12">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">packages/core-ui</h2>
      <p className="text-muted-foreground text-xl">@ci-repo/core-ui</p>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">개요</h4>
        <p>shadcn 라이브러리, 공통 컴포넌트와 Storybook 경로입니다.</p>
        <p>shadcn/ui 기반 컴포넌트를 래핑해 출시 표면(API)을 최소화하고, Storybook으로 문서화하는 UI 패키지입니다.</p>
        <p>Tailwind CSS v4를 기본으로 사용하며, Vite + Storybook 환경을 포함합니다.</p>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">1. src/publish/components/</h4>
        <p className="text-muted-foreground">외부 공개 래퍼</p>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">역할:</span> {'"공개 표면" 담당. 외부 소비자는 이 경로를 통해서만 UI를 사용'}
          </li>
          <li>
            <span className="font-bold">커스텀 컴포넌트:</span> 사용자 커스텀 공통 컴포넌트 위치
          </li>
        </ul>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">2. src/index.css</h4>
        <p className="text-muted-foreground">Tailwind v4 + 토큰</p>
        <ul className="ml-6 list-disc">
          <li>{"@import 'tailwindcss', @import 'tw-animate-css'"}</li>
          <li>{'@source로 모노레포 경로 스캔(../../../{apps,packages}/*/src/**/*.{js,ts,jsx,tsx})'}</li>
          <li>
            CSS 변수로 design tokens 정의(--background, --primary, --sidebar-* 등) 및 @layer base에서 기본 스타일 적용
          </li>
        </ul>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">3. src/shadcn/</h4>
        <p className="text-muted-foreground">내부 전용 원본</p>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">components/ui/:</span> shadcn/ui 원본 컴포넌트
          </li>
          <li>
            <span className="font-bold">hooks/use-mobile.ts:</span> shadcn/ui 원본 반응형 판단 훅
          </li>
          <li>
            <span className="font-bold">lib/utils.ts:</span> shadcn/ui 원본 cn 유틸
          </li>
          <li>
            <span className="font-bold">역할:</span> 외부 공개 전 내부 원본. 직접 임포트 금지(공개 표면은
            publish/components를 통해 노출)
          </li>
        </ul>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">4. .storybook/</h4>
        <p className="text-muted-foreground">Storybook 설정</p>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">main.ts:</span> React-Vite preset, addons 설정(Chromatic, Docs, A11y, Controls
            등), stories glob
          </li>
          <li>
            <span className="font-bold">preview.ts:</span> 전역 파라미터 및 전역 CSS(src/index.css) 적용
          </li>
          <li>
            <span className="font-bold">vitest.setup.ts:</span> 테스트 통합 설정
          </li>
        </ul>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">5. src/stories/</h4>
        <p className="text-muted-foreground">문서/예제</p>
        <ul className="ml-6 list-disc">
          <li>
            기본 Button/Page/Header 스토리, 설정/가이드 MDX 포함. 프레이밍용 샘플이므로 패키지 API에는 포함되지 않음.
          </li>
        </ul>
      </div>

      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">6. 사용 방법(다른 패키지에서)</h4>
        <Card>
          <CardContent>
            <p>{'// Button, Card, Sidebar만 공개되어 있는 경우'}</p>
            <p>{"import { Button, Card, Sidebar } from '@ci-repo/coreui'"}</p>
            <p className="mt-4">{'// (지양) 내부 경로 딥임포트 — 내부 구조 변경 시 깨짐'}</p>
            <p>{"// import { Button } from '@ci-repo/coreui/src/shadcn/components/ui/button'"}</p>
          </CardContent>
        </Card>
        <ul className="ml-6 list-disc">
          <li>
            @ci-repo/coreui는 Tailwind v4 토큰/유틸을 사용. 소비 앱의 전역 CSS에서 Tailwind v4 활성화와 @source 스캔
            경로가 올바른지 확인
          </li>
          <li>Storybook 내에서는 .storybook/preview.ts에서 src/index.css를 이미 로드</li>
        </ul>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">7. Storybook</h4>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">실행:</span> {'프로젝트 루트 경로에서 "pnpm run:storybook"'}
          </li>
          <li>
            <span className="font-bold">빌드:</span>{' '}
            {'/packages/core-ui에서 "pnpm --filter @ci-repo/coreui build-storybook"'}
          </li>
          <li>
            .storybook/main.ts에서 React-Vite preset + Docs/A11y/Interactions 등 애드온 구성. 전역 스타일은
            preview.ts에서 src/index.css를 import
          </li>
        </ul>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">8. 의존성/설정 포인트</h4>
        <ul className="ml-6 list-disc">
          <li>
            <span className="font-bold">React 19 + Vite 7 + Tailwind v4:</span> @tailwindcss/vite 플러그인 사용
          </li>
          <li>
            <span className="font-bold">shadcn 기반:</span> class-variance-authority, lucide-react, Radix UI 컴포넌트
            의존 포함
          </li>
          <li>
            <span className="font-bold">ESM 패키지:</span> {'"type": "module", TS moduleResolution: "bundler"'}
          </li>
          <li>
            <span className="font-bold">ESLint/TS/Prettier:</span> 루트/공유 설정을 따름(모노레포 packages/config)
          </li>
        </ul>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">9. 추가/확장 가이드</h4>
        <div className="mt-1 font-semibold">새로운 컴포넌트를 공개하려면:</div>
        <div className="ml-2">
          <p>1. src/shadcn/components/ui/* 혹은 신규 내부 컴포넌트 구현</p>
          <p>{'2. src/publish/components/<Name>.tsx 작성(Props 보정/조합 등 래핑)'}</p>
          <p>3. 루트 index.ts에 export 추가</p>
          <p>{'4. src/stories/<Name>.stories.tsx로 사용법 문서화'}</p>
        </div>
        <div className="mt-1 font-semibold">디자인 토큰/테마:</div>
        <ul className="ml-6 list-disc">
          <li>
            src/index.css의 CSS 변수로 제어(다크/라이트, 브랜드 컬러 등). 앱 전역에서 동일 토큰 체계를 재사용 가능
          </li>
        </ul>
      </div>
      <div className="pt-6">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">10. 주의사항</h4>
        <ul className="ml-6 list-disc">
          <li>공개 표면은 루트 index.ts로만 노출(변경 안정성). 내부(shadcn)로의 직접 임포트 금지</li>
          <li>
            Tailwind v4 사용 시 소비 앱의 @source 경로가 모노레포 루트 기준으로 컴포넌트 소스를 스캔하도록 설정되어야
            스타일 누락이 없음
          </li>
          <li>
            Storybook과 앱의 Tailwind preset/스캔 경로가 달라질 경우 스타일 차이가 발생할 수 있으므로 경로 일치 권장
          </li>
        </ul>
      </div>
    </div>
  )
}
