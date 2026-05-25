import { colors, borderRadius, fontSize, fontWeight } from './theme'
import type { CSSProperties } from 'react'

interface TimerBarProps {
  porcentagem: number
  tempoRestante?: number
}

function timerColor(pct: number): string {
  if (pct > 50) return colors.success;
  if (pct > 25) return colors.warning;
  return colors.error;
}

const containerStyle: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: 12,
  backgroundColor: colors.border,
  borderRadius: borderRadius.button,
  overflow: 'hidden',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
}

const textStyle: CSSProperties = {
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  fontSize: 10,
  fontWeight: fontWeight.bold,
  color: colors.textPrimary,
  lineHeight: 1,
  zIndex: 1,
  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
}

export default function TimerBar({ porcentagem, tempoRestante }: TimerBarProps) {
  const clamped = Math.max(0, Math.min(100, porcentagem))
  const tempoTexto = tempoRestante !== undefined ? `${tempoRestante}s` : undefined
  const color = timerColor(clamped)

  return (
    <div style={containerStyle}>
      <div
        style={{
          height: '100%',
          background: `linear-gradient(90deg, ${color} 0%, ${color}cc 100%)`,
          borderRadius: borderRadius.button,
          transition: 'width 0.3s ease, background 0.5s ease',
          width: `${clamped}%`,
          boxShadow: `0 0 8px ${color}40`,
        }}
      />
      {tempoTexto && <span style={textStyle}>{tempoTexto}</span>}
    </div>
  )
}
