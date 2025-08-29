'use client'
import { Button } from '@ci-repo/core-ui'

export default function CustomButton() {
  const btnClickHandler = () => {
    alert('버튼 클릭함!')
  }
  return (
    <Button
      variant={'secondary'}
      size={'default'}
      onClick={btnClickHandler}
    >
      커스텀 버튼임
    </Button>
  )
}
