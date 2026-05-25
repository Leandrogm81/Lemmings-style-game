import { colors, fontSize, fontWeight, spacing, shadow } from './theme'
import Button from './Button'

interface MenuScreenProps {
  onPlay?: () => void
  onDebugWin?: () => void
  onDebugLose?: () => void
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100dvh',
    background: `linear-gradient(180deg, ${colors.bg} 0%, #0f0f23 50%, #0a0a18 100%)`,
    padding: spacing.md,
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden',
  },
  stars: {
    position: 'absolute',
    inset: 0,
    backgroundImage:
      'radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.3) 0%, transparent 100%), ' +
      'radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.2) 0%, transparent 100%), ' +
      'radial-gradient(1.5px 1.5px at 50% 10%, rgba(255,255,255,0.4) 0%, transparent 100%), ' +
      'radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.2) 0%, transparent 100%), ' +
      'radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.3) 0%, transparent 100%)',
    pointerEvents: 'none',
  },
  ground: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    background: `linear-gradient(0deg, ${colors.terrainDark} 0%, ${colors.terrain} 40%, transparent 100%)`,
    opacity: 0.3,
    pointerEvents: 'none',
  },
  content: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.lg,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.xs,
  },
  title: {
    fontSize: 56,
    fontWeight: fontWeight.bold,
    color: colors.primary,
    margin: 0,
    textAlign: 'center',
    textShadow: `0 0 30px ${colors.primary}40, 0 2px 4px rgba(0,0,0,0.5)`,
    letterSpacing: 4,
  },
  subtitle: {
    fontSize: fontSize.body,
    fontWeight: fontWeight.regular,
    color: colors.textMuted,
    margin: 0,
    textAlign: 'center',
    letterSpacing: 6,
    textTransform: 'uppercase' as const,
  },
  creatureRow: {
    display: 'flex',
    gap: 8,
    marginTop: spacing.sm,
  },
  creature: {
    width: 28,
    height: 32,
    borderRadius: '6px 6px 4px 4px',
    background: `linear-gradient(180deg, ${colors.creature} 0%, #3b82f6 100%)`,
    position: 'relative' as const,
    boxShadow: `0 0 12px ${colors.creature}40`,
  },
  creatureEye: {
    position: 'absolute' as const,
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: '#fff',
    top: 8,
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  debugRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.lg,
  },
  debugBtn: {
    padding: '6px 14px',
    fontSize: 11,
    border: `1px solid ${colors.border}`,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: colors.textMuted,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
}

function CreaturePreview({ delay }: { delay: number }) {
  return (
    <div
      style={{
        ...styles.creature,
        animation: `bob ${2 + delay * 0.3}s ease-in-out ${delay}s infinite`,
      }}
    >
      <div style={{ ...styles.creatureEye, left: 6 }} />
      <div style={{ ...styles.creatureEye, left: 16 }} />
      <div
        style={{
          position: 'absolute',
          bottom: -4,
          left: 4,
          width: 8,
          height: 4,
          borderRadius: '0 0 4px 4px',
          backgroundColor: colors.creature,
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: -4,
          right: 4,
          width: 8,
          height: 4,
          borderRadius: '0 0 4px 4px',
          backgroundColor: colors.creature,
          opacity: 0.6,
        }}
      />
    </div>
  )
}

export default function MenuScreen({ onPlay, onDebugWin, onDebugLose }: MenuScreenProps) {
  return (
    <div style={styles.container}>
      <div style={styles.stars} />
      <div style={styles.ground} />
      <div style={styles.content}>
        <div style={styles.logoContainer}>
          <h1 style={styles.title}>LEMMINGS</h1>
          <p style={styles.subtitle}>Salve as criaturas</p>
        </div>

        <div style={styles.creatureRow}>
          <CreaturePreview delay={0} />
          <CreaturePreview delay={0.4} />
          <CreaturePreview delay={0.8} />
          <CreaturePreview delay={0.2} />
          <CreaturePreview delay={0.6} />
        </div>

        <style>{`
          @keyframes bob {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
          }
        `}</style>

        <div style={styles.actions}>
          <Button variant="primary" onClick={onPlay}>Jogar</Button>
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
    </div>
  )
}
