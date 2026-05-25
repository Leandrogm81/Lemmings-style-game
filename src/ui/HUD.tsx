import { colors, spacing, fontSize, fontWeight, shadow } from './theme'
import TimerBar from './TimerBar'
import SkillButton from './SkillButton'
import type { CSSProperties } from 'react'

const containerStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  backgroundColor: 'rgba(255,255,255,0.95)',
  boxShadow: shadow.card,
  padding: `${spacing.sm}px ${spacing.md}px`,
  boxSizing: 'border-box',
}

const topRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const counterStyle: CSSProperties = {
  fontSize: fontSize.body,
  fontWeight: fontWeight.semibold,
  color: colors.textPrimary,
  lineHeight: 1.3,
}

const levelLabelStyle: CSSProperties = {
  fontSize: fontSize.helper,
  fontWeight: fontWeight.medium,
  color: colors.textSecondary,
  lineHeight: 1.3,
}

const buttonsRowStyle: CSSProperties = {
  display: 'flex',
  gap: spacing.sm,
  marginTop: spacing.md,
  flexWrap: 'wrap',
}

export default function HUD() {
  return (
    <div style={containerStyle}>
      {/* Top row: creature counter + level info */}
      <div style={topRowStyle}>
        <span style={counterStyle}>x5</span>
        <span style={levelLabelStyle}>Nível 1</span>
      </div>

      {/* Timer bar */}
      <div style={{ marginTop: spacing.sm }}>
        <TimerBar porcentagem={100} tempoRestante={60} />
      </div>

      {/* Skill buttons */}
      <div style={buttonsRowStyle}>
        <SkillButton nome="Escavar" />
        <SkillButton nome="Construir" />
        <SkillButton nome="Bloquear" />
        <SkillButton nome="Empurrar" />
      </div>
    </div>
  )
}
