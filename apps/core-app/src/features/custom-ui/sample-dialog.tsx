interface DialogProps {
  open: boolean
  onClose: () => void
  onExit?: () => void
}

export function Dialog({ open, onClose, onExit }: DialogProps) {
  return (
    <div className={open ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/50' : 'hidden'}>
      <div className="w-[400px] rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-900">
        <h2 className="mb-4 text-lg font-semibold">샘플 Dialog</h2>
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">overlay-kit 예제용 다이얼로그입니다.</p>
        <div className="flex justify-end gap-2">
          <button
            className="rounded-md bg-gray-200 px-4 py-2 hover:bg-gray-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            onClick={() => {
              onExit?.()
            }}
          >
            닫기
          </button>
          <button
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => {
              alert('확인!')
              onClose()
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}
