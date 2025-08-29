import { Card, CardContent } from '@ci-repo/core-ui'
import Link from 'next/link'

export function MainView() {
  return (
    <div className="w-full p-12">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">프로젝트 개요</h2>
      <p className="text-muted-foreground text-xl">Turborepo, pnpm, Next.js 기반 모노레포 환경 구성 예제입니다.</p>
      <div className="pt-6">
        <div>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">1. 프로젝트 개요</h4>
          <div className="mt-3 text-lg font-semibold">개요</div>
          <p>
            본 프로젝트는 Next.js / React 기반 신규 프로젝트 착수 시, 다양한 프로젝트에서 재사용 가능한 공통 기반을
            마련하는 것을 목표로 합니다.
          </p>
          <p>
            이를 위해 효율적인 의존성 관리와 일관된 디자인 시스템 운영을 지원하며, 초기 설정에 드는 불필요한 공수를
            줄이고 개발자 간 협업 효율과 프로젝트 일관성을 높이고자 제작되었습니다.
          </p>
          <div className="mt-3 text-lg font-semibold">목적</div>
          <ul className="ml-6 list-disc">
            <li>Next.js / React 기반 애플리케이션과 공통 패키지를 하나의 리포지토리에서 통합 관리</li>
            <li>공통 모듈/설정을 공유해 재사용성·일관성·확장성 강화</li>
            <li>신규/외부 인원이 와도 빠르게 진입 가능한 표준 개발 환경 제공</li>
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">2. 프로젝트 구성</h4>
          <div className="mt-3 text-lg font-semibold">모노레포</div>
          <div>이 프로젝트는 Turborepo + pnpm을 기반으로 한 모노레포(monorepo) 구조로 구성되어 있습니다.</div>
          <div className="mt-1 font-semibold">모노레포를 채택한 이유</div>
          <ul className="ml-6 list-disc">
            <li>여러 앱과 라이브러리를 단일 저장소에서 관리해 일관된 개발 경험 확보</li>
            <li>공통 설정과 의존성을 공유하여 중복 최소화 및 관리 용이성 확보</li>
            <li>기능별 패키지를 모듈화하여 재사용성과 확장성 강화</li>
            <li>변경 사항을 한 리포에서 추적할 수 있어 가시성 및 협업 효율성 증대</li>
          </ul>
          <div className="mt-1 font-semibold">모노레포 장점</div>
          <ul className="ml-6 list-disc">
            <li>
              <span className="font-bold">통합 빌드/테스트 파이프라인:</span> Turborepo가 의존성 그래프 기반으로 영향
              범위만 빌드/테스트
            </li>
            <li>
              <span className="font-bold">캐시 활용:</span> 로컬/원격 캐시로 빌드와 CI 속도 개선
            </li>
            <li>
              <span className="font-bold">패키지 간 일관성:</span> syncpack + pnpm workspace로 버전 관리 표준화
            </li>
            <li>
              <span className="font-bold">온보딩 단순화:</span> 신규 개발자가 단일 리포를 클론하여 바로 전체 환경 실행
              가능
            </li>
          </ul>
          <div className="mt-3 text-lg font-semibold">주요 디렉토리</div>
          <ul className="ml-6 list-disc">
            <li>apps/: 실행 애플리케이션</li>
            <li>packages/: 재사용 라이브러리/설정 모듈</li>
            <ul className="ml-6 list-disc">
              <li>core-ui: shadcn/UI, 공통 컴포넌트, Storybook 패키지</li>
              <li>core-lib: 공통 유틸/도메인 모듈(http-client, store, utils 등)</li>
              <li>config: eslint, prettier, typescript 설정 모음</li>
            </ul>
          </ul>
          <div className="mt-3 text-lg font-semibold">주요 루트 구성 파일</div>
          <ul className="ml-6 list-disc">
            <li>turbo.json: Turborepo 파이프라인/캐시 설정</li>
            <li>pnpm-workspace.yaml: 워크스페이스(패키지 경로) 정의</li>
            <li>package.json: 공통 스크립트/엔진/툴 버전 등 워크스페이스 전체 오케스트레이션</li>
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            3. 모노레포 관리 도구: Turborepo, syncpack
          </h4>
          <div className="mt-3 text-lg font-semibold">Turborepo</div>
          <div className="mt-3 font-semibold">역할:</div>
          <ul className="ml-6 list-disc">
            <li>JavaScript와 TypeScript 코드 베이스의 모노레포를 위한 고성능 빌드 시스템</li>
            <li>모노레포 환경에서 각 패키지의 빌드·테스트·타입체크·실행을 위한 통합 오케스트레이션 도구</li>
            <li>package.json: 공통 스크립트/엔진/툴 버전 등 워크스페이스 전체 오케스트레이션</li>
          </ul>
          <div className="mt-3 font-semibold">특징:</div>
          <ul className="ml-6 list-disc">
            <li>
              <span className="font-bold">의존성 그래프 기반 실행:</span> 변경된 패키지 및 영향 범위만 증분 빌드/테스트
            </li>
            <li>
              <span className="font-bold">병렬 실행:</span> 독립적인 태스크를 동시에 처리하여 CI/CD 속도 향상
            </li>
            <li>
              <span className="font-bold">로컬·원격 캐시 재사용:</span> 동일 입력/출력에 대해 빌드·테스트 결과를 재활용,
              파이프라인 시간 단축
            </li>
            <li>
              <span className="font-bold">표준화된 태스크 관리:</span> dev, build, lint, test, storybook 등을 일관된
              방식으로 실행
            </li>
            <li>
              <span className="font-bold">확장성:</span> 소규모부터 대규모 모노레포까지 유연하게 대응 가능
            </li>
          </ul>
          <div className="mt-1 text-sm">
            참고자료:{' '}
            <Link
              href={'https://engineering.linecorp.com/ko/blog/monorepo-with-turborepo'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline underline-offset-4"
            >
              Turborepo로 모노레포 개발 경험 향상하기
            </Link>
          </div>
          <div className="mt-3 text-lg font-semibold">syncpack</div>
          <ul className="ml-6 list-disc">
            <li>
              <span className="font-bold">역할:</span> 워크스페이스 전반의 의존성 버전 일관성 유지
            </li>
            <li>
              <span className="font-bold">이점:</span> 장기 운영에서 버전 드리프트로 인한 보안/호환성 리스크 감소
            </li>
            <li>
              <span className="font-bold">사용 예시:</span>
              <Card>
                <CardContent>
                  <p>pnpm syncpack list-mismatches # 버전 불일치 확인</p>
                  <p>pnpm syncpack fix-mismatches # 자동 정렬 후 pnpm i</p>
                </CardContent>
              </Card>
            </li>
          </ul>
        </div>
        <div className="mt-6">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">4.패키지 매니저: pnpm</h4>
          <div className="mt-3 text-lg font-semibold">pnpm 선정 이유</div>
          <ul className="ml-6 list-disc">
            <li>하드링크/심볼릭 링크 + 콘텐츠 주소형 저장소를 활용하여 설치 속도가 빠르고 디스크 사용 효율이 높음</li>
            <li>Node.js 기본 해상과 유사하게 동작해 Next.js, Storybook, Vite, TS 빌드 도구 등과 호환성이 뛰어남</li>
            <li>워크스페이스 기능이 단순하고 workspace:* 버전을 이용해 내부 패키지를 명확히 연결할 수 있음</li>
            <li>팀 온보딩이 쉽고, 별도의 복잡한 설정이 필요하지 않아 운영이 단순함</li>
          </ul>
          <div className="mt-3 text-lg font-semibold">Yarn Berry(PnP/Zero‑Installs)와의 비교</div>
          <div className="mt-1 font-semibold">Yarn Berry 장점</div>
          <ul className="ml-6 list-disc">
            <li>
              <span className="font-bold">PnP(Plug’n’Play):</span> node_modules 없이 .pnp.cjs로 패키지를 해상하여 의존성
              관리 속도가 빠름
            </li>
            <li>
              <span className="font-bold">Zero‑Installs:</span> .yarn/cache에 의존성을 zip으로 보관하고 이를 Git에
              커밋하면, 브랜치 전환이나 CI 환경에서도 install 과정 없이 즉시 실행 가능
            </li>
            <li>
              <span className="font-bold">이점:</span> 설치 속도와 재현성이 뛰어나고, CI/CD 환경에서 네트워크 의존성을
              크게 줄일 수 있음
            </li>
          </ul>
          <div className="mt-1 font-semibold">Yarn Berry 고려사항</div>
          <ul className="ml-6 list-disc">
            <li>일부 플러그인·툴체인과의 호환성 문제가 발생할 수 있음 (특히 node_modules 구조를 가정하는 도구들)</li>
            <li>.yarn/cache를 Git에 포함하면 저장소 크기가 커지고, 레포 관리 정책에 따라 부담이 될 수 있음</li>
          </ul>
          <div className="mt-1 text-sm">
            참고자료:{' '}
            <Link
              href={'https://devocean.sk.com/blog/techBoardDetail.do?ID=166592'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline underline-offset-4"
            >
              패키지 매니저 선택을 위한 여정: NPM에서 Yarn으로 그리고 다시 pNPM
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
