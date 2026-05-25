import { colors, spacing, fontSize, fontWeight, shadow } from './theme'
import TimerBar from './TimerBar'
import SkillButton from './SkillButton'
import type { CSSProperties } from 'react'

// ─── Tipos ────────────────────────────────────────────────────────────────

/** Estado de uma skill vindo do engine */
export interface HUDSkillState {
  id: string
  nome: string
  disponivel: boolean
  cooldownRestanteMs: number
}

interface HUDProps {
  /** Número de criaturas restantes (vivas + não salvas) */
  criaturasRestantes?: number
  /** Nome do nível atual */
  nomeNivel?: string
  /** Porcentagem do timer (0-100) */
  timerPorcentagem?: number
  /** Tempo restante em segundos */
  tempoRestante?: number
  /** Lista de skills com estado atual */
  skills?: HUDSkillState[]
  /** ID da skill atualmente selecionada */
  skillSelecionada?: string | null
  /** Callback quando o jogador clica em uma skill */
  onSkillClick?: (skillId: string) => void
}

// ─── Estilos ──────────────────────────────────────────────────────────────

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

// ─── Valores padrão (compatível com uso sem props) ────────────────────────

const DEFAULT_SKILLS: HUDSkillState[] = [
  { id: 'escavar', nome: 'Escavar', disponivel: true, cooldownRestanteMs: 0 },
  { id: 'construir', nome: 'Construir', disponivel: true, cooldownRestanteMs: 0 },
  { id: 'bloquear', nome: 'Bloquear', disponivel: true, cooldownRestanteMs: 0 },
  { id: 'empurrar', nome: 'Empurrar', disponivel: true, cooldownRestanteMs: 0 },
]

// ─── Componente ───────────────────────────────────────────────────────────

export default function HUD({
  criaturasRestantes = 5,
  nomeNivel = 'Nível 1',
  timerPorcentagem = 100,
  tempoRestante = 60,
  skills = DEFAULT_SKILLS,
  skillSelecionada = null,
  onSkillClick,
}: HUDProps) {
  return (
    <div style={containerStyle}>
      {/* Top row: creature counter + level info */}
      <div style={topRowStyle}>
        <span style={counterStyle}>x{criaturasRestantes}</span>
        <span style={levelLabelStyle}>{nomeNivel}</span>
      </div>

      {/* Timer bar */}
      <div style={{ marginTop: spacing.sm }}>
        <TimerBar porcentagem={timerPorcentagem} tempoRestante={tempoRestante} />
      </div>

      {/* Skill buttons */}
      <div style={buttonsRowStyle}>
        {skills.map((skill) => (
          <SkillButton
            key={skill.id}
            nome={skill.nome}
            ativo={skill.disponivel}
            onClick={() => onSkillClick?.(skill.id)}
          />
        ))}
      </div>
    </div>
  )
}
