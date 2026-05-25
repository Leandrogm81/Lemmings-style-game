import { colors, spacing, fontSize, fontWeight, shadow } from './theme'
import TimerBar from './TimerBar'
import SkillButton from './SkillButton'
import type { CSSProperties } from 'react'

export interface HUDSkillState {
  id: string
  nome: string
  disponivel: boolean
  cooldownRestanteMs: number
}

interface HUDProps {
  criaturasRestantes?: number
  nomeNivel?: string
  timerPorcentagem?: number
  tempoRestante?: number
  skills?: HUDSkillState[]
  skillSelecionada?: string | null
  onSkillClick?: (skillId: string) => void
}

const containerStyle: CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 100,
  background: `linear-gradient(180deg, ${colors.surfaceElevated} 0%, ${colors.surface} 100%)`,
  borderBottom: `1px solid ${colors.border}`,
  boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
  padding: `${spacing.sm}px ${spacing.md}px`,
  boxSizing: 'border-box',
}

const topRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}

const counterStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: fontSize.body,
  fontWeight: fontWeight.bold,
  color: colors.creature,
}

const levelLabelStyle: CSSProperties = {
  fontSize: fontSize.helper,
  fontWeight: fontWeight.medium,
  color: colors.textSecondary,
}

const buttonsRowStyle: CSSProperties = {
  display: 'flex',
  gap: spacing.xs,
  marginTop: spacing.sm,
  flexWrap: 'wrap',
  justifyContent: 'center',
}

const DEFAULT_SKILLS: HUDSkillState[] = [
  { id: 'escavar', nome: 'Escavar', disponivel: true, cooldownRestanteMs: 0 },
  { id: 'construir', nome: 'Construir', disponivel: true, cooldownRestanteMs: 0 },
  { id: 'bloquear', nome: 'Bloquear', disponivel: true, cooldownRestanteMs: 0 },
  { id: 'empurrar', nome: 'Empurrar', disponivel: true, cooldownRestanteMs: 0 },
]

export default function HUD({
  criaturasRestantes = 1,
  nomeNivel = 'Nível 1',
  timerPorcentagem = 100,
  tempoRestante = 90,
  skills = DEFAULT_SKILLS,
  skillSelecionada = null,
  onSkillClick,
}: HUDProps) {
  return (
    <div style={containerStyle}>
      <div style={topRowStyle}>
        <span style={counterStyle}>
          <span style={{ fontSize: 16 }}>👤</span> {criaturasRestantes}
        </span>
        <span style={levelLabelStyle}>{nomeNivel}</span>
      </div>
      <div style={{ marginTop: spacing.xs }}>
        <TimerBar porcentagem={timerPorcentagem} tempoRestante={tempoRestante} />
      </div>
      <div style={buttonsRowStyle}>
        {skills.map((skill) => (
          <SkillButton
            key={skill.id}
            nome={skill.nome}
            ativo={skill.disponivel}
            selecionado={skillSelecionada === skill.id}
            onClick={() => onSkillClick?.(skill.id)}
          />
        ))}
      </div>
    </div>
  )
}
