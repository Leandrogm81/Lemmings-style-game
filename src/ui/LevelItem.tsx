import { colors, spacing, borderRadius, fontSize, fontWeight, shadow } from './theme'
import type { LevelData } from './levels'

interface LevelItemProps {
  level: LevelData
  onClick?: () => void
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
  border: `1px solid ${colors.border}`,
}

const contentArea: React.CSSProperties = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: spacing.md,
  gap: spacing.xxs,
}

export default function LevelItem({ level, onClick }: LevelItemProps) {
  const isUnlocked = level.desbloqueado

  const cardStyle: React.CSSProperties = {
    ...cardBase,
    background: isUnlocked
      ? `linear-gradient(135deg, ${colors.surface} 0%, ${colors.surfaceElevated} 100%)`
      : colors.surface,
    opacity: isUnlocked ? 1 : 0.5,
    cursor: isUnlocked && onClick ? 'pointer' : 'default',
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
    <div
      style={cardStyle}
      onClick={isUnlocked ? onClick : undefined}
      onMouseEnter={(e) => {
        if (isUnlocked) {
          e.currentTarget.style.borderColor = colors.primary;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
      }}
    >
      <div
        style={{
          width: 4,
          flexShrink: 0,
          backgroundColor: isUnlocked ? colors.primary : colors.border,
        }}
      />
      <div style={contentArea}>
        <p style={nameStyle}>{level.nome}</p>
        <p style={statusStyle}>
          {isUnlocked ? 'Disponível' : '🔒 Bloqueado'}
        </p>
      </div>
    </div>
  )
}
