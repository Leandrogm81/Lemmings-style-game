import { colors, spacing, fontSize, fontWeight, borderRadius, shadow } from './theme';
import Button from './Button';
import type { CSSProperties } from 'react';

interface VictoryScreenProps {
  nomeNivel?: string;
  criaturasSalvas?: number;
  tempoRestante?: number;
  onMenu: () => void;
  onProximoNivel?: () => void;
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `radial-gradient(ellipse at center, ${colors.successBg} 0%, rgba(0,0,0,0.85) 70%)`,
  padding: spacing.md,
  boxSizing: 'border-box',
};

const cardStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 340,
  minHeight: 280,
  background: `linear-gradient(180deg, ${colors.surfaceElevated} 0%, ${colors.surface} 100%)`,
  border: `1px solid ${colors.success}40`,
  borderRadius: borderRadius.modal,
  boxShadow: `0 0 40px ${colors.success}20, ${shadow.modal}`,
  padding: spacing.xl,
  boxSizing: 'border-box',
  gap: spacing.md,
  textAlign: 'center',
};

const trophyStyle: CSSProperties = {
  fontSize: 64,
  lineHeight: 1,
  margin: 0,
  filter: 'drop-shadow(0 0 20px rgba(74,222,128,0.5))',
};

const titleStyle: CSSProperties = {
  fontSize: fontSize.sectionTitle,
  fontWeight: fontWeight.bold,
  color: colors.success,
  margin: 0,
  textShadow: `0 0 20px ${colors.success}40`,
};

const statsStyle: CSSProperties = {
  fontSize: fontSize.body,
  fontWeight: fontWeight.regular,
  color: colors.textSecondary,
  margin: 0,
  lineHeight: 1.8,
};

const actionsStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: spacing.sm,
  width: '100%',
  maxWidth: 220,
  marginTop: spacing.sm,
};

export default function VictoryScreen({
  nomeNivel = 'Nível 1',
  criaturasSalvas = 0,
  tempoRestante = 0,
  onMenu,
  onProximoNivel,
}: VictoryScreenProps) {
  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <p style={trophyStyle}>🏆</p>
        <h2 style={titleStyle}>Vitória!</h2>
        <p style={statsStyle}>
          {nomeNivel} concluído<br />
          Criaturas salvas: {criaturasSalvas}<br />
          ⏱ {tempoRestante}s restantes
        </p>
        <div style={actionsStyle}>
          {onProximoNivel && (
            <Button variant="primary" onClick={onProximoNivel}>
              Próximo nível →
            </Button>
          )}
          <Button variant="secondary" onClick={onMenu}>
            Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
