import { colors, spacing, borderRadius, fontSize, fontWeight, shadow } from './theme'
import type { CSSProperties } from 'react'

interface SkillButtonProps {
  nome: string
  ativo?: boolean
  onClick?: () => void
}

const EMOJI_MAP: Record<string, string> = {
  Escavar: '⛏',
  Construir: '🧱',
  Bloquear: '🔒',
  Empurrar: '➡️',
}

const buttonBase: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  padding: spacing.xs,
  borderRadius: borderRadius.button,
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  boxShadow: shadow.button,
  boxSizing: 'border-box',
  transition: 'background-color 0.2s',
  gap: 2,
}

export default function SkillButton({ nome, ativo = true, onClick }: SkillButtonProps) {
  const isActive = ativo
  const emoji = EMOJI_MAP[nome] || nome.charAt(0)

  const buttonStyle: CSSProperties = {
    ...buttonBase,
    cursor: isActive ? 'pointer' : 'not-allowed',
    opacity: isActive ? 1 : 0.5,
  }

  return (
    <button
      style={buttonStyle}
      onClick={isActive ? onClick : undefined}
      disabled={!isActive}
      onMouseEnter={(e) => {
        if (isActive) {
          e.currentTarget.style.backgroundColor = '#F1F5F9'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = colors.surface
      }}
    >
      <span
        style={{
          fontSize: fontSize.body,
          fontWeight: fontWeight.semibold,
          color: isActive ? colors.primary : colors.textMuted,
          lineHeight: 1,
        }}
      >
        {emoji}
      </span>
      <span
        style={{
          fontSize: fontSize.helper,
          fontWeight: fontWeight.medium,
          color: isActive ? colors.textSecondary : colors.textMuted,
          lineHeight: 1,
          textAlign: 'center',
          whiteSpace: 'nowrap',
        }}
      >
        {nome}
      </span>
    </button>
  )
}
