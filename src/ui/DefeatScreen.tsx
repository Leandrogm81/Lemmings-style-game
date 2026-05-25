import { colors, spacing, fontSize, fontWeight, borderRadius, shadow } from './theme';
import Button from './Button';
import type { CSSProperties } from 'react';

interface DefeatScreenProps {
  nomeNivel?: string;
  motivo?: string;
  onMenu: () => void;
  onTentarNovamente: () => void;
}

const overlayStyle: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 200,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: `radial-gradient(ellipse at center, ${colors.errorBg} 0%, rgba(0,0,0,0.85) 70%)`,
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
  border: `1px solid ${colors.error}40`,
  borderRadius: borderRadius.modal,
  boxShadow: `0 0 40px ${colors.error}20, ${shadow.modal}`,
  padding: spacing.xl,
  boxSizing: 'border-box',
  gap: spacing.md,
  textAlign: 'center',
};

const iconStyle: CSSProperties = {
  fontSize: 64,
  lineHeight: 1,
  margin: 0,
  filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.4))',
};

const titleStyle: CSSProperties = {
  fontSize: fontSize.sectionTitle,
  fontWeight: fontWeight.bold,
  color: colors.error,
  margin: 0,
  textShadow: `0 0 20px ${colors.error}40`,
};

const motivoStyle: CSSProperties = {
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

const dicaStyle: CSSProperties = {
  fontSize: fontSize.helper,
  fontWeight: fontWeight.regular,
  color: colors.textMuted,
  margin: 0,
  lineHeight: 1.4,
};

export default function DefeatScreen({
  nomeNivel = 'Nível 1',
  motivo = 'O tempo acabou',
  onMenu,
  onTentarNovamente,
}: DefeatScreenProps) {
  return (
    <div style={overlayStyle}>
      <div style={cardStyle}>
        <p style={iconStyle}>💔</p>
        <h2 style={titleStyle}>Derrota</h2>
        <p style={motivoStyle}>
          {nomeNivel}<br />
          {motivo}
        </p>
        <p style={dicaStyle}>
          Dica: use 🧱 Construir para preencher o buraco no caminho das criaturas!
        </p>
        <div style={actionsStyle}>
          <Button variant="primary" onClick={onTentarNovamente}>
            Tentar novamente
          </Button>
          <Button variant="secondary" onClick={onMenu}>
            Menu
          </Button>
        </div>
      </div>
    </div>
  );
}
