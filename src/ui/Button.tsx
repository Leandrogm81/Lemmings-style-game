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
  transition: 'all 0.2s ease',
  minHeight: 48,
  boxSizing: 'border-box',
  fontFamily: 'inherit',
}

const variants: Record<'primary' | 'secondary', CSSProperties> = {
  primary: {
    ...baseStyle,
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
    color: '#FFFFFF',
    boxShadow: `0 2px 8px ${colors.primary}40`,
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
          e.currentTarget.style.boxShadow = `0 0 16px ${colors.primary}60`;
        } else {
          e.currentTarget.style.borderColor = colors.primary;
          e.currentTarget.style.color = colors.primary;
        }
      }}
      onMouseLeave={(e) => {
        if (variant === 'primary') {
          e.currentTarget.style.boxShadow = `0 2px 8px ${colors.primary}40`;
        } else {
          e.currentTarget.style.borderColor = colors.border;
          e.currentTarget.style.color = colors.textSecondary;
        }
      }}
    >
      {children}
    </button>
  )
}
