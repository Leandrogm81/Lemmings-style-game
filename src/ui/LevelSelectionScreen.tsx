import { colors, spacing, fontSize, fontWeight } from './theme'
import { niveis } from './levels'
import LevelItem from './LevelItem'
import Button from './Button'

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100dvh',
    backgroundColor: colors.background,
    padding: spacing.md,
    boxSizing: 'border-box',
  },
  inner: {
    width: '100%',
    maxWidth: 600,
  },
  backRow: {
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: fontSize.sectionTitle,
    fontWeight: fontWeight.semibold,
    color: colors.textPrimary,
    margin: 0,
    textAlign: 'center',
  },
  gridWrapper: {
    marginTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
}

interface LevelSelectionScreenProps {
  /** Callback opcional para voltar ao menu. Se fornecido, exibe botão "Voltar". */
  onBack?: () => void
  /** Callback quando o jogador seleciona um nível */
  onSelectLevel?: (levelId: number) => void
}

export default function LevelSelectionScreen({ onBack, onSelectLevel }: LevelSelectionScreenProps) {
  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {onBack && (
          <div style={styles.backRow}>
            <Button variant="secondary" onClick={onBack}>
              ← Voltar
            </Button>
          </div>
        )}
        <h2 style={styles.title}>Selecionar Nível</h2>
        <div style={styles.gridWrapper}>
          <style>{`
            .level-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: ${spacing.sm}px;
            }
            @media (max-width: 639px) {
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
