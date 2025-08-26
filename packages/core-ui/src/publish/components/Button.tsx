import type { ComponentProps, ReactNode } from 'react'
import { ButtonUI } from '../../shadcn/components/ui/button'

type ButtonVariants = 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | null | undefined
type ButtonSizes = 'default' | 'sm' | 'lg' | 'icon' | null | undefined

export interface ButtonProps extends ComponentProps<'button'> {
  /** 버튼 내부 string or Component */
  children?: ReactNode
  /** 버튼 추가 className */
  className?: string
  /** 버튼 종류(background, color, border, font, ...) props */
  variant?: ButtonVariants
  /** 버튼 사이즈 props */
  size?: ButtonSizes
}

export function Button({ children = '', ...props }: ButtonProps) {
  return <ButtonUI {...props}>{children}</ButtonUI>
}
