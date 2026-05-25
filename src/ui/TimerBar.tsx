import { colors, borderRadius, fontSize, fontWeight } from './theme'
import type { CSSProperties } from 'react'

interface TimerBarProps {
  porcentagem: number
  tempoRestante?: number
}

const containerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: 10,
  backgroundColor: colors.border,
  borderRadius: borderRadius.button,
  overflow: 'hidden',
}

const fillBase: CSSProperties = {
  height: '100%',
  backgroundColor: colors.primary,
  borderRadius: borderRadius.button,
  transition: 'width 0.3s ease',
}

const textStyle: CSSProperties = {
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: fontSize.helper,
  fontWeight: fontWeight.medium,
  color: colors.textPrimary,
  lineHeight: 1,
}

export default function TimerBar({ porcentagem, tempoRestante }: TimerBarProps) {
  const clamped = Math.max(0, Math.min(100, porcentagem))
  const tempoTexto = tempoRestante !== undefined ? `${tempoRestante}s` : undefined

  return (
    <div style={containerStyle}>
      <div style={{ ...fillBase, width: `${clamped}%` }} />
      {tempoTexto && <span style={textStyle}>{tempoTexto}</span>}
    </div>
  )
}
