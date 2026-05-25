import { colors, spacing, fontSize, fontWeight, borderRadius, shadow } from './theme'
import { niveis } from './levels'
import LevelItem from './LevelItem'
import Button from './Button'

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100dvh',
    background: `linear-gradient(180deg, ${colors.bg} 0%, #0f0f23 100%)`,
    padding: spacing.md,
    boxSizing: 'border-box',
  },
  inner: {
    width: '100%',
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.lg,
  },
  topRow: {
    display: 'flex',
    alignItems: 'center',
    gap: spacing.md,
  },
  title: {
    fontSize: fontSize.sectionTitle,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    margin: 0,
    textAlign: 'center' as const,
    flex: 1,
  },
  gridWrapper: {
    paddingBottom: spacing.xl,
  },
}

interface LevelSelectionScreenProps {
  onBack?: () => void
  onSelectLevel?: (levelId: number) => void
}

export default function LevelSelectionScreen({ onBack, onSelectLevel }: LevelSelectionScreenProps) {
  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        <div style={styles.topRow}>
          {onBack && (
            <Button variant="secondary" onClick={onBack}>
              ← Voltar
            </Button>
          )}
          <h2 style={styles.title}>Níveis</h2>
        </div>
        <div style={styles.gridWrapper}>
          <style>{`
            .level-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: ${spacing.sm}px;
            }
            @media (max-width: 380px) {
              .level-grid {
                grid-template-columns: 1fr;
              }
            }
          `}</style>
          <div className="level-grid">
            {niveis.map((level) => (
              <LevelItem
                key={level.id}
                level={level}
                onClick={level.desbloqueado ? () => onSelectLevel?.(level.id) : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
