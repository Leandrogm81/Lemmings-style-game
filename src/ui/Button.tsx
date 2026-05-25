import { colors, borderRadius, fontSize, fontWeight, shadow } from './theme'
import type { CSSProperties, ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  disabled?: boolean
}

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px 32px',
  fontSize: fontSize.button,
  fontWeight: fontWeight.semibold,
  borderRadius: borderRadius.button,
  border: 'none',
  cursor: 'pointer',
  lineHeight: 1.4,
  transition: 'background-color 0.2s, box-shadow 0.2s',
  minHeight: 48,
  boxSizing: 'border-box',
}

const variants: Record<'primary' | 'secondary', CSSProperties> = {
  primary: {
    ...baseStyle,
    backgroundColor: colors.primary,
    color: '#FFFFFF',
    boxShadow: shadow.button,
  },
  secondary: {
    ...baseStyle,
    backgroundColor: 'transparent',
    color: colors.textSecondary,
    border: `1px solid ${colors.border}`,
  },
}

export default function Button({ children, variant = 'primary', onClick, disabled = false }: ButtonProps) {
  const style: CSSProperties = {
    ...variants[variant],
    ...(disabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
  }

  return (
    <button
      style={style}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = colors.primaryHover
        } else {
          e.currentTarget.style.backgroundColor = '#F1F5F9'
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.backgroundColor = colors.primary
        } else {
          e.currentTarget.style.backgroundColor = 'transparent'
        }
      }}
    >
      {children}
    </button>
  )
}
