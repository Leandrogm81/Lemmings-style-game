import { colors, borderRadius, fontSize, fontWeight, shadow } from './theme'
import type { CSSProperties } from 'react'

interface SkillButtonProps {
  nome: string
  ativo?: boolean
  selecionado?: boolean
  onClick?: () => void
}

const EMOJI_MAP: Record<string, string> = {
  Escavar: '⛏',
  Construir: '🧱',
  Bloquear: '🔒',
  Empurrar: '➡️',
}

const ICON_MAP: Record<string, string> = {
  Escavar: '⛏️',
  Construir: '🧱',
  Bloquear: '🛡️',
  Empurrar: '💨',
}

export default function SkillButton({ nome, ativo = true, selecionado = false, onClick }: SkillButtonProps) {
  const emoji = ICON_MAP[nome] || nome.charAt(0)

  const buttonStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 58,
    padding: '6px 4px',
    borderRadius: borderRadius.button,
    background: selecionado
      ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`
      : colors.surfaceElevated,
    border: selecionado
      ? `2px solid ${colors.primary}`
      : `1px solid ${colors.border}`,
    boxShadow: selecionado ? `0 0 12px ${colors.primary}40` : shadow.button,
    boxSizing: 'border-box',
    cursor: ativo ? 'pointer' : 'not-allowed',
    opacity: ativo ? 1 : 0.35,
    transition: 'all 0.15s ease',
    gap: 1,
    fontFamily: 'inherit',
  }

  return (
    <button
      style={buttonStyle}
      onClick={ativo ? onClick : undefined}
      disabled={!ativo}
      onMouseEnter={(e) => {
        if (ativo && !selecionado) {
          e.currentTarget.style.background = colors.surface;
          e.currentTarget.style.borderColor = colors.primary;
        }
      }}
      onMouseLeave={(e) => {
        if (!selecionado) {
          e.currentTarget.style.background = colors.surfaceElevated;
          e.currentTarget.style.borderColor = colors.border;
        }
      }}
    >
      <span style={{ fontSize: 18, lineHeight: 1 }}>
        {emoji}
      </span>
      <span
        style={{
          fontSize: 11,
          fontWeight: fontWeight.semibold,
          color: selecionado ? '#fff' : colors.textSecondary,
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
