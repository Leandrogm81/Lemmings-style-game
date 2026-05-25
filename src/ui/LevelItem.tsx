import { colors, spacing, borderRadius, fontSize, fontWeight, shadow } from './theme'
import type { LevelData } from './levels'

interface LevelItemProps {
  level: LevelData
}

const cardBase: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'stretch',
  borderRadius: borderRadius.card,
  boxShadow: shadow.card,
  overflow: 'hidden',
  boxSizing: 'border-box',
  minHeight: 80,
}

const accentBar: React.CSSProperties = {
  width: 4,
  flexShrink: 0,
}

const contentArea: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: spacing.md,
  gap: spacing.xxs,
}

export default function LevelItem({ level }: LevelItemProps) {
  const isUnlocked = level.desbloqueado

  const cardStyle: React.CSSProperties = {
    ...cardBase,
    backgroundColor: colors.surface,
    opacity: isUnlocked ? 1 : 0.5,
  }

  const accentStyle: React.CSSProperties = {
    ...accentBar,
    backgroundColor: isUnlocked ? colors.success : colors.border,
  }

  const nameStyle: React.CSSProperties = {
    fontSize: fontSize.body,
    fontWeight: fontWeight.semibold,
    color: isUnlocked ? colors.textPrimary : colors.textMuted,
    margin: 0,
    lineHeight: 1.3,
  }

  const statusStyle: React.CSSProperties = {
    fontSize: fontSize.helper,
    fontWeight: fontWeight.medium,
    color: isUnlocked ? colors.success : colors.textMuted,
    margin: 0,
    lineHeight: 1.4,
  }

  return (
    <div style={cardStyle}>
      <div style={accentStyle} />
      <div style={contentArea}>
        <p style={nameStyle}>{level.nome}</p>
        <p style={statusStyle}>
          {isUnlocked ? 'Disponível' : 'Bloqueado'}
        </p>
      </div>
    </div>
  )
}
