import { colors, fontSize, fontWeight, spacing } from './theme'
import Button from './Button'

interface MenuScreenProps {
  /** Chamado quando o jogador clica "Jogar" */
  onPlay?: () => void
  /** Depuração: simula uma vitória (para testar streak de anúncio) */
  onDebugWin?: () => void
  /** Depuração: simula uma derrota (para testar streak de anúncio) */
  onDebugLose?: () => void
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100dvh',
    backgroundColor: colors.background,
    padding: spacing.md,
    boxSizing: 'border-box',
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: fontWeight.bold,
    color: colors.textPrimary,
    margin: 0,
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  debugRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xl,
  },
  debugBtn: {
    padding: '8px 16px',
    fontSize: 12,
    border: '1px solid #E2E8F0',
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    color: '#64748B',
    cursor: 'pointer',
  },
}

export default function MenuScreen({ onPlay, onDebugWin, onDebugLose }: MenuScreenProps) {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lemmings</h1>
      <div style={styles.actions}>
        <Button variant="primary" onClick={onPlay}>Jogar</Button>
        <Button variant="secondary">Opções</Button>
      </div>
      <div style={styles.debugRow}>
        <button style={styles.debugBtn} onClick={onDebugWin}>
          [Debug] Vitória
        </button>
        <button style={styles.debugBtn} onClick={onDebugLose}>
          [Debug] Derrota
        </button>
      </div>
    </div>
  )
}
